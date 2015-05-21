"use strict";

function NotificationListCtrl(NotificationService){
    
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
        NotificationService.get({page:this.page}, this.onGetList.bind(this));   
    }

    this.onGetList = function(response){
        this.count = response.count;
        this.list = response.results;
        window.scrollTo(0, 0);
    }

    this.delete = function(page_id){
        event.preventDefault();   
        var confirmDelete = confirm('Esta seguro de querer borrar este elemento?');   

        if (confirmDelete) {
            NotificationService.delete({id:page_id}, this.onDelete.bind(this));
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