"use strict";

function PageFormCtrl($routeParams, PageService, action){

    this.data = {};
    this.action = action;
    this.form = false;

    this.init = function(){
        if(this.action == 'edit'){ this.populate(); }
    }

    this.populate = function(){
        PageService.get({id:$routeParams.id},
            this.onPopulateOk.bind(this),
            this.onPopulateError.bind(this)
        );
    }

    this.submit = function(){
        this.form.submitted = true;
        if (this.form.$valid) {
            if(this.action == 'new'){
                PageService.post({}, this.data,
                    this.onSubmitOk.bind(this),
                    this.onSubmitError.bind(this)
                );
            }

            if(this.action == 'edit'){
                PageService.put({id:$routeParams.id}, this.data,
                    this.onSubmitOk.bind(this),
                    this.onSubmitError.bind(this)
                );
            }
        }
    }

    this.onPopulateOk = function(response){
        this.data.title = response.title;
        this.data.content = response.content;
        this.data.published = response.published;
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
    .module('app.page.controllers')
    .controller('PageFormCtrl', PageFormCtrl);