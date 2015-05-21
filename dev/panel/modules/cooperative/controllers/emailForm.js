"use strict";

function EmailFormCtrl($routeParams, EmailService, action){
    this.data = {};
    this.action = action;
    this.form = false;

    this.init = function(){
        if(this.action == 'edit'){ this.populate(); }
    }

    this.populate = function(){
        EmailService.get({id:$routeParams.id},
            this.onPopulateOk.bind(this),
            this.onPopulateError.bind(this)
        );
    }

    this.submit = function(){
        this.form.submitted = true;
        if (this.form.$valid) {
            if(this.action == 'new'){
                EmailService.post({}, this.data,
                    this.onSubmitOk.bind(this),
                    this.onSubmitError.bind(this)
                );
            }

            if(this.action == 'edit'){
                EmailService.put({id:$routeParams.id}, this.data,
                    this.onSubmitOk.bind(this),
                    this.onSubmitError.bind(this)
                );
            }
        }
    }

    this.onPopulateOk = function(response){
        this.data.name = response.data.name;
        this.data.email = response.data.email;
    }

    this.onPopulateError = function(response){

    }

    this.onSubmitOk = function(response){
        this.form.success = true;
    }

    this.onSubmitError = function(response){
        this.form.success = false;
    }

    this.init();
}

angular
    .module('app.cooperative.controllers')
    .controller('EmailFormCtrl', EmailFormCtrl);