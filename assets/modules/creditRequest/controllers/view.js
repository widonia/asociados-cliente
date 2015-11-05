"use strict";

function CreditRequestViewCtrl($rootScope, $routeParams, CreditRequestService){

    this.data = {};
    this.form = {};


    this.init = function(){
        this.populate();
    }

    this.populate = function(){
        $rootScope.$broadcast('loading-show');
        CreditRequestService.get({id:$routeParams.id},
            this.onPopulateOk.bind(this),
            this.onPopulateError.bind(this)
        );
    }

    this.onPopulateOk = function(response){
        $rootScope.$broadcast('loading-hide');
        this.data = response;
        this.data.data.amount =  parseFloat(this.data.data.amount); 
        this.data.data.months =  parseInt(this.data.data.months); 
    }

    this.onPopulateError = function(response){
        $rootScope.$broadcast('loading-hide');
        console.log(response);
    }

    this.process = function(){
        var onSuccess = function(response){
           
        }

        var onError = function(response){
            if (this.data.processed != undefined){
                this.data.processed = !this.data.processed;
            }
        }

        var confirmDelete = confirm('¿Está seguro que desea cambiar el estado?');

        if (confirmDelete) {
            CreditRequestService.proccess({'id':$routeParams.id}, 
                onSuccess.bind(this), 
                onError.bind(this)
            );
        }else{
            if (this.data.processed != undefined){
                this.data.processed = !this.data.processed;
            }
        }        
    }


   this.onSubmit = function(response){
        this.form.success = true;
    }

    this.onSubmitErr = function(response){
        this.form.success = false;
    }

    this.submit = function(){
        // this.form.submitted = true;
        if (this.form.$valid) {
            CreditRequestService.put({id:$routeParams.id}, this.data,
                this.onSubmit.bind(this),
                this.onSubmitErr.bind(this)
            );
        }
    }

    this.init();
}

angular
    .module('app.creditRequest.controllers')
    .controller('CreditRequestViewCtrl', CreditRequestViewCtrl);