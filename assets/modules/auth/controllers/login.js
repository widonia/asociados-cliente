"use strict";

function LoginCtrl($rootScope, $routeParams, $location, AuthService, AuthManager, UserService, AUTH_EVENTS){

    this.form = false;
    this.coop = false;
    this.coopList = [];
    this.username = '';
    this.password = '';

    this.init = function(){;
        AuthService.check({},
            this.onLoginOk.bind(this),
            this.onLoginError.bind(this)
        );
    }

    this.login = function(){
        AuthService.post({'username': this.username, 'password':this.password},
            this.onLoginOk.bind(this),
            this.onLoginError.bind(this) 
        );
    }

    this.onLoginOk = function(response){
        this.form = false;
        this.get_coopList();
    }

    this.get_coopList = function(){
        UserService.cooperative({}, 
            this.onCoopListOk.bind(this)
        )
    }

    this.onCoopListOk = function(response){
        var size = Object.keys(response.data).length;

        if(size == 1){
            this.selectCoop(response.data[0].cooperative.id, response.data[0].role);
            return true;
        }

        this.coop = true;
        this.coopList = response.data
    }

    this.onLoginError = function(response){
        this.form = true;
        this.coop = false;
        AuthManager.logout();
    }

    this.selectCoop = function(cooperative, role){
        if(role < 5){
            AuthManager.auth(cooperative, role);
            this.goNext();
        }else{
            $rootScope.$broadcast(AUTH_EVENTS.notAuthorized, {title:'Error', content: 'No posee permisos para esta accion'});
            AuthManager.logout()
        }
    }

    this.goNext = function(){
        var next = ($routeParams.next) ? $routeParams.next : '/';
        $location.url(next);     
    }

    this.init();
}

angular
    .module('app.auth.controllers')
    .controller('LoginCtrl', LoginCtrl)