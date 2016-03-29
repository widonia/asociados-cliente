"use strict";

function UserFormCtrl($rootScope, $routeParams, $q, UserService, action, SweetAlert){
    this.data = {};
    this.action = action;
    this.form = false;
    this.no_form_show = false;

    this.init = function(){
        if(this.action == 'edit'){
            this.populate();
        }
    }

    this.populate = function(){
        UserService.get({id:$routeParams.id}, this.onPopulate.bind(this));
    }

    this.onPopulate = function(response){
        this.data = response;
    }

    this.submit = function(){
        this.form.submitted = true;
        if (this.form.$valid) {
            if(this.action == 'new'){
                UserService.save({}, this.data,
                    this.onSubmit.bind(this),
                    this.onSubmitErr.bind(this)
                );
            }

            if(this.action == 'edit'){
                UserService.put({id:$routeParams.id}, this.data,
                    this.onSubmit.bind(this),
                    this.onSubmitErr.bind(this)
                );
            }
        }
    }

    this.onSubmit = function(response){
        this.form.success = true;
        SweetAlert.swal("¡Realizado!", "Acción realizada correctamente.", "success");
        if (this.action == "new"){
            this.no_form_show = true;
        }else{
            this.no_form_show = false;
        }
    }

    this.onSubmitErr = function(response){
        this.form.success = false;
        SweetAlert.swal("Error!", "Lo sentimos, no se pudo completar la acción.", "error"); 
    }

    this.init();
}

angular
    .module('app.user.controllers')
    .controller('UserFormCtrl', UserFormCtrl);
