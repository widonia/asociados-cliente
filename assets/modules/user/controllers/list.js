"use strict";

function UserListCtrl($rootScope, UserService){

    this.onDonwnloadSucces = function(response){
        var msg = "Se envío la información a: "+response.data.emails.join(",\n"); 
        $rootScope.$broadcast("INFO", {title:'Correo envíado', content: msg});
    }

    this.onDonwnloadError = function(response){
        $rootScope.$broadcast("INFO", {title:'Error al enviar', content: "Ocurrió un error."});
    }

    this.download_data = function(){
        UserService.download_data(this.onDonwnloadSucces.bind(this), this.onDonwnloadError.bind(this));
    }
}


angular
    .module('app.user.controllers')
    .controller('UserListCtrl', UserListCtrl);