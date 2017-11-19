"use strict";

function NotificationListCtrl($rootScope, NotificationService, SweetAlert){

    this.count = 0;
    this.page = 1;
    this.list = [];


    this.init = function(){
        console.log("ntra");
        this.getList();
    }

    this.setPage = function () {
        this.getList();
    };

    this.getList = function(){
        $rootScope.$broadcast('loading-show');
        NotificationService.get({page:this.page}, this.onGetList.bind(this));
    }

    this.onGetList = function(response){
        console.log(response);
        $rootScope.$broadcast('loading-hide');

        this.count = response.count;
        this.list = response.data;
        console.log(this.list);
        window.scrollTo(0, 0);
    }

    this.delete = function(id, event){
        event.preventDefault();
        SweetAlert.swal({
           title: "¿Está seguro?",
           text: "Se eliminará este elemento, esta seguro?",
           type: "warning",
           showCancelButton: true,
           confirmButtonColor: "#DD6B55",confirmButtonText: "Si, ¡quiero eliminarlo!",
           cancelButtonText: "No, ¡cancelar ya!",
           closeOnConfirm: false,
           closeOnCancel: false }, 
        function(isConfirm){ 
           if (isConfirm) {
            $rootScope.$broadcast('loading-show');
            NotificationService.delete({id:id}, this.onDelete.bind(this));
              SweetAlert.swal("¡Eliminado!", "Notificación eliminada correctamente.", "success");
           } else {
              SweetAlert.swal("Cancelado", "No se eliminó nada.", "error");
           }
        });
    }

    this.onDelete = function(){
        this.getList();
    }

    this.init();
}

angular
    .module('app.notification.controllers')
    .controller('NotificationListCtrl', NotificationListCtrl);
