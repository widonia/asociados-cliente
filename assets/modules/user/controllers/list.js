"use strict";

function UserListCtrl($rootScope, UserService, SweetAlert){

    this.onDonwnloadSucces = function(response){
        var emails = response.data.emails;
        if (Array.isArray(emails)){
            emails = emails.join(",\n");
        }
        
        var msg = "Pronto recibitá un correo a la dirección "+emails+" con la información solicitada."; 
        SweetAlert.swal({
            title: "Correo enviado!", 
            text: msg,
            type: "success",
            html: true
        });
    }

    this.onDonwnloadError = function(response){
        SweetAlert.swal({
            title: "Error", 
            text: "Ocurrió un error.", 
            type: "error",
            timer: 2000
        });
    }

    this.download_data = function(){
        var confirmation = function(isConfirm){ 
           if (isConfirm) {
                UserService.download_data(this.onDonwnloadSucces.bind(this), this.onDonwnloadError.bind(this));               
            } else {
                SweetAlert.swal({
                    title: "Canecelado", 
                    text: "Cancelado", 
                    type: "error",
                    timer: 1000
                });
            }
        }
        SweetAlert.swal({
           title: "¿Está seguro?",
           text: "Está seguro que desea descarga la información de los asociados?. <br> Esto tardará un tiempo en completarse.",
           type: "warning",
           html: true,
           showCancelButton: true,
           confirmButtonColor: "#DD6B55",
           confirmButtonText: "Si, Decargar",
           cancelButtonText: "Cancelar",
           closeOnConfirm: false,
           closeOnCancel: false 
        },                    
            confirmation.bind(this)
        );        
    }

    this.filterImageUser = function () {
        UserService.listImageRevision(this.onImageSuccess, this.onImageError);
    }

    this.onImageSuccess = function(response){
        console.log(response);
    }

    this.onImageError = function(response){
        console.log(response);
    }
}


angular
    .module('app.user.controllers')
    .controller('UserListCtrl', UserListCtrl);