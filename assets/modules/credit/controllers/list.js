"use strict";

function CreditListCtrl(CreditService){
    
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
        CreditService.get({page:this.page}, this.onGetList.bind(this));   
    }

    this.onGetList = function(response){
        this.count = response.count;
        this.list = response.results;
        console.log(this.list);
        window.scrollTo(0, 0);
    }

    this.init();
}

angular
    .module('app.credit.controllers')
    .controller('CreditListCtrl', CreditListCtrl);