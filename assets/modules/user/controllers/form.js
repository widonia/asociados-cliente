"use strict";

function UserFormCtrl($rootScope, $routeParams, $q, UserService, action){
    this.data = {};
    this.action = action;
    this.form = false;

    this.init = function(){
        if(this.action == 'edit'){
            this.populate();
        }
    }

    this.populate = function(){
        UserService.get({id:$routeParams.id}, this.onPopulate.bind(this));
    }

    this.onPopulate = function(response){
        this.data = response;
    }

    this.submit = function(){
        this.form.submitted = true;
        if (this.form.$valid) {
            if(this.action == 'new'){
                UserService.save({}, this.data,
                    this.onSubmit.bind(this),
                    this.onSubmitErr.bind(this)
                );
            }

            if(this.action == 'edit'){
                UserService.put({id:$routeParams.id}, this.data,
                    this.onSubmit.bind(this),
                    this.onSubmitErr.bind(this)
                );
            }
        }
    }

    this.onSubmit = function(response){
        this.form.success = true;
    }

    this.onSubmitErr = function(response){
        this.form.success = false;
    }

    this.init();
}

angular
    .module('app.user.controllers')
    .controller('UserFormCtrl', UserFormCtrl);