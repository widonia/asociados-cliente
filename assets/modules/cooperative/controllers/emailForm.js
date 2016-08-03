"use strict";

function EmailFormCtrl($rootScope, $routeParams, EmailService, action){
    this.data = {};
    this.action = action;
    this.form = false;

    this.init = function(){
                
        var onOptionsOk = function(response){
            this.data.options_type = response.actions.POST.type.choices
            if(this.action == 'edit'){ this.populate(); }
        };

        var onOptionsError = function(response){

        }
        EmailService.options({}, onOptionsOk.bind(this), onOptionsError.bind(this));
    }




    this.populate = function(){
        $rootScope.$broadcast('loading-show');
        EmailService.get({id:$routeParams.id},
            this.onPopulateOk.bind(this),
            this.onPopulateError.bind(this)
        );
    }

    this.onPopulateOk = function(response){
        $rootScope.$broadcast('loading-hide');
        this.data.name = response.name;
        this.data.email = response.email;
        this.data.type_selected = this.data.options_type.filter(function(v){ return v.value==response.type;})[0]

    }

    this.onPopulateError = function(response){
        $rootScope.$broadcast('loading-hide');
    }

    this.submit = function(){
        $rootScope.$broadcast('loading-show');
        this.form.submitted = true;
        this.data.type = this.data.type_selected.value;
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


    this.onSubmitOk = function(response){
        $rootScope.$broadcast('loading-hide');
        this.form.success = true;
    }

    this.onSubmitError = function(response){
        $rootScope.$broadcast('loading-hide');
        this.form.success = false;
    }

    this.init();
}

angular
    .module('app.cooperative.controllers')
    .controller('EmailFormCtrl', EmailFormCtrl);