"use strict";

function CreditRequestListCtrl($rootScope, CreditRequestService){
    
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
        CreditRequestService.get({page:this.page}, this.onGetList.bind(this));   
    }

    this.onGetList = function(response){
        $rootScope.$broadcast('loading-hide');
        this.count = response.count;
        this.list = response.results;
        window.scrollTo(0, 0);
    }

    this.onDonwnloadSucces = function(response){
        var msg = "Se envío la información a: "+response.data.emails.join(",\n"); 
        $rootScope.$broadcast("INFO", {title:'Correo envíado', content: msg});
    }

    this.onDonwnloadError = function(response){
       $rootScope.$broadcast("INFO", {title:'Error al enviar', content: "Ocurrió un error."});
    }

    this.download_data = function(){
        CreditRequestService.download_data(this.onDonwnloadSucces.bind(this), this.onDonwnloadError.bind(this));
    }

    this.init();
}

angular
    .module('app.creditRequest.controllers')
    .controller('CreditRequestListCtrl', CreditRequestListCtrl);