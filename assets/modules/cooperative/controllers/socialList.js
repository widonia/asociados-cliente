"use strict";

function SocialListCtrl($rootScope, $routeParams, SocialService, SweetAlert){
    this.data = {};
    this.form = false;


    this.init = function(){
        this.getList();        
    }

    this.getList = function(){
        $rootScope.$broadcast('loading-show');
        SocialService.query(this.onGetList.bind(this))
    }

    this.onGetList = function(response){
        this.data = response;
        // console.log("Entra por aca");
        // $rootScope.$broadcast('loading-hide');
        // this.count = response.count;
        // this.list = response.data;
        // window.scrollTo(0, 0);
    }

    this.delete = function(id, event){
        event.preventDefault();
        var confirmation = function(isConfirm){ 
           if (isConfirm) {
                $rootScope.$broadcast('loading-show');
                SocialService.delete({id:id}, this.onDelete.bind(this));
                SweetAlert.swal("¡Eliminado!", "Elemento eliminado correctamente.", "success");
            } else {
                SweetAlert.swal({
                    title: "Cancelado", 
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
    .controller('SocialListCtrl', SocialListCtrl);