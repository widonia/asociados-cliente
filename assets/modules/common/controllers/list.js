"use strict";

function CRUDListCtrl($rootScope, CRUDService, settings){

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
        this.list = response.results;
        window.scrollTo(0, 0);
    }

    this.delete = function(id){
        event.preventDefault();
        var confirmDelete = confirm('¿Está seguro de borrar este elemento?');

        if (confirmDelete) {
            // $rootScope.$broadcast('loading-show');
            CRUDService.delete({object:settings.object, id:id}, this.onDelete.bind(this));
        }
    }

    this.onDelete = function(){
        this.getList();
    }

    this.init();
}

angular
    .module('app.common.controllers')
    .controller('CRUDListCtrl', CRUDListCtrl);
