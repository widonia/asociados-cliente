"use strict";

function GroupsFormCtrl($rootScope, $routeParams, GroupsService, action){
    this.data = {};
    this.action = action;
    this.form = false;


    this.init = function(){
        if(this.action == 'edit'){ this.populate(); }  
    }

    this.populate = function(){
        $rootScope.$broadcast('loading-show');
        GroupsService.get({id:$routeParams.id},
            this.onPopulate.bind(this),
            this.onPopulateErr.bind(this)
        );
    }

    this.onPopulate = function(response){
        $rootScope.$broadcast('loading-hide');
        this.data.name = response.name;
    }

    this.onPopulateErr = function(response){
        $rootScope.$broadcast('loading-hide');
        // console.log(response);
    }

    this.submit = function(){
        $rootScope.$broadcast('loading-show');
        if (this.form.$valid) {
            if(this.action == 'new'){
                GroupsService.post(this.data, this.onSubmit.bind(this), this.onSubmitErr.bind(this));
            }else{
                GroupsService.patch({id:$routeParams.id}, this.data, this.onSubmit.bind(this), this.onSubmitErr.bind(this));
            }
        }
    }

    this.onSubmit = function(response){
        $rootScope.$broadcast('loading-hide');
        this.form.success = true;
    }

    this.onSubmitErr = function(response){
        $rootScope.$broadcast('loading-hide');
        this.form.success = false
    }

    this.init();
}

angular
    .module('app.groups.controllers')
    .controller('GroupsFormCtrl', GroupsFormCtrl);
