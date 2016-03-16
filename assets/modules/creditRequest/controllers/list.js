"use strict";

function CreditRequestListCtrl($rootScope, CreditRequestService){
    
    this.count = 0;
    this.page = 1;
    this.list = [];

    this.init = function(){
        this.getList();
        console.log('init');
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
        this.list = response.data;
        window.scrollTo(0, 0);
    }

    this.onDonwnloadSucces = function(response){        
        var emails = response.data.emails;
        if (Array.isArray(emails)){
            emails = emails.join(",\n");
        }
        var msg = "Se envío la información a: "+emails; 
        $rootScope.$broadcast("INFO", {title:'Correo envíado', content: msg});
    }

    this.onDonwnloadError = function(response){
       $rootScope.$broadcast("INFO", {title:'Error al enviar', content: "Ocurrió un error."});
    }

    this.download_data = function(){
        if (confirm('¿Está seguro que desea descarga la información de la solitudes de créditos?.\nEsto tardara un tiempo en completarse.')) { 
            CreditRequestService.download_data(this.onDonwnloadSucces.bind(this), this.onDonwnloadError.bind(this));
        }        
    }

    this.init();
}

angular
    .module('app.creditRequest.controllers')
    .controller('CreditRequestListCtrl', CreditRequestListCtrl);