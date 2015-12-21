"use strict";

function UserListCtrl($rootScope, UserService){

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
        if (confirm('¿Está seguro que desea descarga la información de los asociados?.\nEsto tardara un tiempo en completarse.')) { 
            UserService.download_data(this.onDonwnloadSucces.bind(this), this.onDonwnloadError.bind(this));
        }        
    }
}


angular
    .module('app.user.controllers')
    .controller('UserListCtrl', UserListCtrl);