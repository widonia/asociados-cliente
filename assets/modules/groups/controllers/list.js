"use strict";

function GroupsListCtrl(GroupsService){
    
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
        GroupsService.get({page:this.page}, this.onGetList.bind(this));   
    }

    this.onGetList = function(response){
        console.log(response);
        this.count = response.count;
        this.list = response.results;
        window.scrollTo(0, 0);
    }

    this.delete = function(id){
        event.preventDefault();   
        var confirmDelete = confirm('Esta seguro de querer borrar este elemento?');   

        if (confirmDelete) {
            GroupsService.delete({id:id}, this.onDelete.bind(this));
        }
    }

    this.onDelete = function(){
        this.getList();
    }

    this.init();
}

angular
    .module('app.groups.controllers')
    .controller('GroupsListCtrl', GroupsListCtrl);