"use strict";

function LoginCtrl($rootScope, $routeParams, $location, Config, AuthService, AuthManager, UserService, AUTH_EVENTS){

    this.form = false;
    this.error = false;

    // this.coop = false;
    this.coopList = [];
    this.username = '';
    this.password = '';
    this.static = Config.STATIC;

    this.init = function(){;
        AuthService.check({},
            this.onLoginOk.bind(this),
            this.onCheckError.bind(this)
        );
    }

    // ["#fbb4ae","#b3cde3","#ccebc5"]

    this.onCheckError = function(){
        this.error = false;
        this.form = true;
    }

    this.login = function(){
        this.error = false;
        this.form = false;
        AuthService.post({'username': this.username, 'password':this.password},
            this.onLoginOk.bind(this),
            this.onLoginError.bind(this) 
        );
    }

    this.onLoginOk = function(response){
        AuthManager.login(response.data.token);
        this.get_coopList(response.data.username, response.data.last_login);
    }

    this.onLoginError = function(response){
        console.log('asdf');
        this.error = true;
        this.form = true;
        AuthManager.logout();
    }

    this.get_coopList = function(username, last_login){
        var self = this;
        UserService.cooperative({}, 
            function(response){                
                self.onCoopListOk(response, username, last_login)
            }            
        )
    }

    this.onCoopListOk = function(response, username, last_login){
        this.selectCoop(response.data[0].cooperative.id, response.data[0].role, username, last_login);
        // var size = Object.keys(response.data).length;

        // if(size == 1){
        //     this.selectCoop(response.data[0].cooperative.id, response.data[0].role);
        //     return true;
        // }

        // this.coop = true;
        // this.coopList = response.data
    }

    this.selectCoop = function(cooperative, role, username, last_login){
        if(role < 5){
            AuthManager.auth(cooperative, role, username, last_login);
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
