"use strict";

function CreditViewCtrl($routeParams, CreditService){

    this.data = {};

    this.init = function(){
        this.populate();
    }

    this.populate = function(){
        CreditService.get({id:$routeParams.id},
            this.onPopulateOk.bind(this),
            this.onPopulateError.bind(this)
        );
    }

    this.onPopulateOk = function(response){
        this.data = response.data;
    }

    this.onPopulateError = function(response){
        console.log(response);
    }

    this.init();
}

angular
    .module('app.credit.controllers')
    .controller('CreditViewCtrl', CreditViewCtrl);