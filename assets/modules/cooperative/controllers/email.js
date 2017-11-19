"use strict";

function EmailListCtrl($rootScope, EmailService, SweetAlert){
    
    this.count = 0;
    this.page = 1;
    this.list = [];

    this.init = function(){
        console.log("setPage");
        this.getList();
    }

    this.setPage = function () {
        console.log("setPage");
        this.getList();
    };

    this.getList = function(){
        $rootScope.$broadcast('loading-show');
        EmailService.get({page:this.page}, this.onGetList.bind(this));
    }

    this.onGetList = function(response){
        $rootScope.$broadcast('loading-hide');
        this.list = response.data;
        window.scrollTo(0, 0);
    }

    this.delete = function(id, event){
        event.preventDefault();   
        var confirmation = function(isConfirm){ 
           if (isConfirm) {
                $rootScope.$broadcast('loading-show');
                EmailService.delete({id:id}, this.onDelete.bind(this));
                SweetAlert.swal("¡Eliminado!", "Elemento eliminado correctamente.", "success");
            } else {
                SweetAlert.swal({
                    title: "Canecelado", 
                    text: "No se eliminó nada.", 
                    type: "error",
                    timer: 2000
                });
            }
        }
        SweetAlert.swal({
           title: "¿Está seguro?",
           text: "Se eliminará este elemento, ¿Esta seguro?",
           type: "warning",
           showCancelButton: true,
           confirmButtonColor: "#DD6B55",
           confirmButtonText: "Si, ¡quiero eliminarlo!",
           cancelButtonText: "Cancelar",
           closeOnConfirm: false,
           closeOnCancel: false 
        },                    
            confirmation.bind(this)
        );
    }

    this.onDelete = function(){
        this.getList();
    }

    this.init();
}

angular
    .module('app.cooperative.controllers')
    .controller('EmailListCtrl', EmailListCtrl);