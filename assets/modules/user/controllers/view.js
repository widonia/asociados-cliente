"use strict";

function UserViewCtrl($routeParams, UserService){

    this.data = {};
    this.type = $routeParams.type;

    this.init = function(){
        this.populate();
    }

    this.populate = function(){
        UserService.request({id:$routeParams.id},
            this.onPopulateOk.bind(this),
            this.onPopulateError.bind(this)
        );
    }

    this.onPopulateOk = function(response){
        this.data = response.data;
    }

    this.onPopulateError = function(response){
    }

    this.init();
}

angular
    .module('app.user.controllers')
    .controller('UserViewCtrl', UserViewCtrl);