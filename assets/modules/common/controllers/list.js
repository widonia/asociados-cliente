"use strict";

function CRUDListCtrl($rootScope, CRUDService, settings, SweetAlert){

    this.count = 0;
    this.page = 1;
    this.list = [];

    this.init = function(){
        this.getList();
    }

    this.setPage = function () {
        this.getList();
    };

    this.getList = function(){
        // $rootScope.$broadcast('loading-show');
        CRUDService.get({object:settings.object, page:this.page}, this.onGetList.bind(this));
    }

    this.onGetList = function(response){
        // $rootScope.$broadcast('loading-hide');

        this.count = response.count;
        this.list = response.data;
        window.scrollTo(0, 0);
    }

    this.delete = function(id){
        event.preventDefault();
        var confirmation = function(isConfirm){ 
           if (isConfirm) {
                CRUDService.delete({object:settings.object, id:id}, this.onDelete.bind(this));
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
    .module('app.common.controllers')
    .controller('CRUDListCtrl', CRUDListCtrl);
