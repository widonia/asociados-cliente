"use strict";

function SocialListCtrl($rootScope, $routeParams, SocialService){
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
        var confirmDelete = confirm('Esta seguro de querer borrar este elemento?');

        if (confirmDelete) {
            $rootScope.$broadcast('loading-show');
            SocialService.delete({id:id}, this.onDelete.bind(this));
        }
    }

    this.onDelete = function(){
        this.getList();
    }

    this.init();



    // this.count = 0;
    // this.page = 1;
    // this.list = [];

    // this.init = function(){
    //     this.getList();
    //     if(this.action == 'edit'){ this.populate(); }
    // }

    // this.setPage = function () {
    //     this.getList();
    // };

    // this.getList = function(){
    //     $rootScope.$broadcast('loading-show');
    //     PageService.get({page:this.page, paginate:1}, this.onGetList.bind(this));
    // }

    // this.onGetList = function(response){
    //     $rootScope.$broadcast('loading-hide');
    //     this.count = response.count;
    //     this.list = response.data;
    //     window.scrollTo(0, 0);
    // }

    // this.delete = function(page_id, event){
    //     event.preventDefault();
    //     var confirmDelete = confirm('Esta seguro de querer borrar este elemento?');

    //     if (confirmDelete) {
    //         $rootScope.$broadcast('loading-show');
    //         PageService.delete({id:page_id}, this.onDelete.bind(this));
    //     }
    // }

    // this.onDelete = function(){
    //     this.getList();
    // }

    // this.init();

}

angular
    .module('app.cooperative.controllers')
    .controller('SocialListCtrl', SocialListCtrl);