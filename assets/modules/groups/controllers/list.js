"use strict";

function GroupsListCtrl($rootScope, GroupsService, SweetAlert){
    
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
        $rootScope.$broadcast('loading-show');
        GroupsService.get({page:this.page}, this.onGetList.bind(this));   
    }

    this.onGetList = function(response){
        $rootScope.$broadcast('loading-hide');
        this.count = response.count;
        this.list = response.data;
        window.scrollTo(0, 0);
    }

    this.delete = function(id, event){
        event.preventDefault();   
        var confirmation = function(isConfirm){ 
           if (isConfirm) {
                $rootScope.$broadcast('loading-show');
                GroupsService.delete({id:id}, this.onDelete.bind(this));
                SweetAlert.swal({
                    title: "!Realizado¡", 
                    text: "Elemento eliminado correctaomente.", 
                    type: "success",
                    timer: 1000
                });
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
           text: "¿Está seguro de querer borrar este elemento?'",
           type: "warning",
           html: true,
           showCancelButton: true,
           confirmButtonColor: "#DD6B55",
           confirmButtonText: "Si, eliminar",
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
    .module('app.groups.controllers')
    .controller('GroupsListCtrl', GroupsListCtrl);