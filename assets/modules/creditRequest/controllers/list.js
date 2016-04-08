"use strict";

function CreditRequestListCtrl($rootScope, CreditRequestService, SweetAlert){
    
    this.count = 0;
    this.page = 1;
    this.list = [];

    this.init = function(){
        this.getList();
        console.log('init');
    }

    this.setPage = function () {
        this.getList();
    };

    this.getList = function(){
        $rootScope.$broadcast('loading-show');
        CreditRequestService.get({page:this.page}, this.onGetList.bind(this));   
    }

    this.onGetList = function(response){
        $rootScope.$broadcast('loading-hide');
        this.count = response.count;
        this.list = response.data;
        window.scrollTo(0, 0);
    }

    this.onDonwnloadSucces = function(response){        
        var emails = response.data.emails;
        if (Array.isArray(emails)){
            emails = emails.join(",\n");
        }
        var msg = "Pronto recibitá un correo a la dirección "+emails+" con la información solicitada."; 
        // $rootScope.$broadcast("INFO", {title:'Correo envíado', content: msg});
        SweetAlert.swal({
            title: "Correo enviado!", 
            text: msg,
            type: "success",
            html: true
        });
    }

    this.onDonwnloadError = function(response){
        SweetAlert.swal({
            title: "Error", 
            text: "Ocurrió un error.", 
            type: "error",
            timer: 2000
        });
    }

    this.download_data = function(){

        var confirmation = function(isConfirm){ 
           if (isConfirm) {
                CreditRequestService.download_data(this.onDonwnloadSucces.bind(this), this.onDonwnloadError.bind(this));                
            } else {
                SweetAlert.swal({
                    title: "Canecelado", 
                    text: "Cancelado", 
                    type: "error",
                    timer: 1000
                });
            }
        }
        SweetAlert.swal({
           title: "¿Está seguro?",
           text: "Está seguro que desea descarga la información de la solitudes de créditos?. <br> Esto tardará un tiempo en completarse.",
           type: "warning",
           html: true,
           showCancelButton: true,
           confirmButtonColor: "#DD6B55",
           confirmButtonText: "Si, Decargar",
           cancelButtonText: "Cancelar",
           closeOnConfirm: false,
           closeOnCancel: false 
        },                    
            confirmation.bind(this)
        );      
    }

    this.init();
}

angular
    .module('app.creditRequest.controllers')
    .controller('CreditRequestListCtrl', CreditRequestListCtrl);