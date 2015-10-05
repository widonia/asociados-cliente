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

    this.init();
}

angular
    .module('app.credit.controllers')
    .controller('CreditViewCtrl', CreditViewCtrl);