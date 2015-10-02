"use strict";

function NotificationListCtrl($rootScope, NotificationService){

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
        NotificationService.get({page:this.page}, this.onGetList.bind(this));
    }

    this.onGetList = function(response){
        $rootScope.$broadcast('loading-hide');

        this.count = response.count;
        this.list = response.results;
        window.scrollTo(0, 0);
    }

    this.delete = function(id){
        event.preventDefault();
        var confirmDelete = confirm('Esta seguro de querer borrar este elemento?');

        if (confirmDelete) {
            $rootScope.$broadcast('loading-show');
            NotificationService.delete({id:id}, this.onDelete.bind(this));
        }
    }

    this.onDelete = function(){
        this.getList();
    }

    this.init();
}

angular
    .module('app.notification.controllers')
    .controller('NotificationListCtrl', NotificationListCtrl);
