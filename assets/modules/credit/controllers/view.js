"use strict";

function CreditViewCtrl($rootScope, $routeParams, CreditService){

    this.data = {};

    this.init = function(){
        this.populate();
    }

    this.populate = function(){
        $rootScope.$broadcast('loading-show');
        CreditService.get({id:$routeParams.id},
            this.onPopulateOk.bind(this),
            this.onPopulateError.bind(this)
        );
    }

    this.onPopulateOk = function(response){
        $rootScope.$broadcast('loading-hide');
        this.data = response;
    }

    this.onPopulateError = function(response){
        $rootScope.$broadcast('loading-hide');
        console.log(response);
    }

    this.process = function(){
        console.log("Hola que hace");

        var onSuccess = function(response){
           
        }

        var onError = function(response){
            if (this.data.processed != undefined){
                this.data.processed = !this.data.processed;
            }
        }

        var confirmDelete = confirm('¿Esta seguro que desea cambiar el ?');

        if (confirmDelete) {
            CreditService.proccess({'id':$routeParams.id}, 
                onSuccess.bind(this), 
                onError.bind(this)
            );
        }else{
            if (this.data.processed != undefined){
                this.data.processed = !this.data.processed;
            }
        }

        
    }

    this.init();
}

angular
    .module('app.credit.controllers')
    .controller('CreditViewCtrl', CreditViewCtrl);