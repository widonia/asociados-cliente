"use strict";

function CreditListCtrl($rootScope, CreditService){
    
    this.count = 0;
    this.page = 1;
    this.list = [];

    this.init = function(){
        this.getList();
    }

    this.setPage = function () {
        this.getList();
    };

    this.getList = function(){
        $rootScope.$broadcast('loading-show');
        CreditService.get({page:this.page}, this.onGetList.bind(this));   
    }

    this.onGetList = function(response){
        $rootScope.$broadcast('loading-hide');
        this.count = response.count;
        this.list = response.results;
        window.scrollTo(0, 0);
    }

    this.init();
}

angular
    .module('app.credit.controllers')
    .controller('CreditListCtrl', CreditListCtrl);