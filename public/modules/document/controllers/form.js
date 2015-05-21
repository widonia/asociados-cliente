"use strict";

function DocumentFormCtrl($routeParams, DocumentService, action){

    this.data = {};
    this.action = '';

    this.init = function(){
        this.action = action;

        if(this.action == 'edit'){ this.populate(); }
    }

    this.populate = function(){
        DocumentService.get({id:$routeParams.id},
            this.onPopulateOk.bind(this),
            this.onPopulateError.bind(this)
        );
    }

    this.submit = function(){
        if (this.document_form.$valid) {

            if(this.action == 'new'){
                DocumentService.post({}, this.data,
                    this.onSubmitOk.bind(this),
                    this.onSubmitError.bind(this)
                );
            }

            if(this.action == 'edit'){
                DocumentService.put({id:$routeParams.id}, this.data,
                    this.onSubmitOk.bind(this),
                    this.onSubmitError.bind(this)
                );
            }

        } else {
            this.document_form.submitted = true;
        }
    }

    this.onPopulateOk = function(response){
        this.data.title = response.title;
        this.data.content = response.content;
    }

    this.onPopulateError = function(response){
        console.log(response);
    }

    this.onSubmitOk = function(response){
        console.log(response);
        console.log('ok');
    }

    this.onSubmitError = function(response){
        console.log(response);
        console.log('error');
    }

    this.init();
}

angular
    .module('app.document.controllers')
    .controller('DocumentFormCtrl', DocumentFormCtrl);