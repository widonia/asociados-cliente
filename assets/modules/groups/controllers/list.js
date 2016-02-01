"use strict";

function GroupsListCtrl($rootScope, GroupsService){
    
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
        var confirmDelete = confirm('Esta seguro de querer borrar este elemento?');   

        if (confirmDelete) {
            $rootScope.$broadcast('loading-show');
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