"use strict";

function EmailListCtrl(EmailService){
    
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
        EmailService.get({page:this.page}, this.onGetList.bind(this));   
    }

    this.onGetList = function(response){
        this.list = response.data;
        console.log(response.data);
        window.scrollTo(0, 0);
    }

    this.delete = function(id){
        event.preventDefault();   
        var confirmDelete = confirm('Esta seguro de querer borrar este elemento?');   

        if (confirmDelete) {
            EmailService.delete({id:id}, this.onDelete.bind(this));
        }
    }

    this.onDelete = function(){
        this.getList();
    }

    this.init();
}

angular
    .module('app.cooperative.controllers')
    .controller('EmailListCtrl', EmailListCtrl);