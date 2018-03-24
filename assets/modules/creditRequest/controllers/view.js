"use strict";

function CreditRequestViewCtrl($rootScope, $routeParams, CreditRequestService, Config, SweetAlert){

    this.data = {};
    this.form = {};

    this.MEDIA = Config.MEDIA;

    this.init = function(){
        this.populate();
    }

    this.populate = function(){
        $rootScope.$broadcast('loading-show');
        CreditRequestService.get({id:$routeParams.id},
            this.onPopulateOk.bind(this),
            this.onPopulateError.bind(this)
        );
    }

    this.onPopulateOk = function(response){
        $rootScope.$broadcast('loading-hide');  
        this.data = response;
        this.data.data.amount =  parseFloat(this.data.data.amount); 
        this.data.data.months =  parseInt(this.data.data.months); 
    }

    this.onPopulateError = function(response){
        $rootScope.$broadcast('loading-hide');
        // console.log(response);
    }

    this.process = function(){
        var onSuccess = function(response){
           SweetAlert.swal({
                title: "Listo", 
                text: "Se cambió el estado.", 
                type: "success",
                timer: 1000
            });
        }

        var onError = function(response){
            if (this.data.processed != undefined){
                this.data.processed = !this.data.processed;
            }
            SweetAlert.swal({
                title: "Eroor", 
                text: "Ocurrió un error.", 
                type: "error"
            });
        }

        var confirmation = function(isConfirm){ 
           if (isConfirm) {
                CreditRequestService.proccess({'id':$routeParams.id}, 
                    onSuccess.bind(this), 
                    onError.bind(this)
                );                
            } else {
                if (this.data.processed != undefined){
                    this.data.processed = !this.data.processed;
                }
                SweetAlert.swal({
                    title: "Cancelado", 
                    text: "No se cambió nada.", 
                    type: "error",
                    timer: 1000
                });
            }
        }

        SweetAlert.swal({
           title: "¿Está seguro?",
           text: "¿Está seguro que desea cambiar el estado?",
           type: "warning",
           showCancelButton: true,
           confirmButtonColor: "#DD6B55",
           confirmButtonText: "Si, ¡Cambiar estado!",
           cancelButtonText: "Cancelar",
           closeOnConfirm: false,
           closeOnCancel: false 
        },                    
            confirmation.bind(this)
        );
    }

   this.onSubmit = function(response){
        this.form.success = true;
        SweetAlert.swal("¡Realizado!", "Acción realizada correctamente.", "success");
    }

    this.onSubmitErr = function(response){
        this.form.success = false;
        SweetAlert.swal("Error!", "Lo sentimos, no se pudo completar la acción.", "error");     
    }

    this.submit = function(){
        if (this.form.$valid) {
            CreditRequestService.put({id:$routeParams.id}, this.data,
                this.onSubmit.bind(this),
                this.onSubmitErr.bind(this)
            );
        }
    }

    this.init();
}

angular
    .module('app.creditRequest.controllers')
    .controller('CreditRequestViewCtrl', CreditRequestViewCtrl);