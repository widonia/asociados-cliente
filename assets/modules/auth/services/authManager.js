"use strict";



function AuthManager($rootScope, $location, AUTH_EVENTS, AUTH_ROLES){
    //lifecycle indicator
    this.isAuth = false;
    this.isLogin = false;
    this.prevUrl = false;
    this.username = null;
    this.last_login = null;

    var prefix = "client_"

    this.del = function(key){
        return localStorage.removeItem(prefix+key);
    }

    this.get = function(key){
        return window.localStorage.getItem(prefix+key);
        // return localStorage[value];
    }

    this.set = function(key, value){
        return localStorage[prefix+key] = value;
    }

    this.login = function(token){
        this.isLogin = true;
        this.set('token', token);
    }

    this.logout = function(){
        // console.log("entraras");
        this.isLogin = false;
        this.isAuth = false;
        this.username = null;
        this.last_login = null;
        this.del('role');
        this.del('token');
        this.del('cooperative');
    }

    this.auth = function(cooperative, role, username, last_login){
        this.isAuth = true;
        $rootScope.user = {}
        $rootScope.user.username = username;
        $rootScope.user.last_login = last_login;
        
        this.username = username;
        this.last_login = last_login;
        this.set('cooperative', cooperative);
        this.set('role', role);
        $rootScope.$broadcast(AUTH_EVENTS.authSuccess);
    }

    this.check = function(current, prev){
        if(this.get('role') == undefined) { this.get('role', AUTH_ROLES.guest); }

        if(current.$$route != undefined){

            //do redirection if the user is login or the role of the page page if guest
            if(this.isAuth == false && current.$$route.role < AUTH_ROLES.guest ){
                $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated, current.$$route.originalPath);
                return true;
            }

            if(this.get('role') > current.$$route.role){
                $rootScope.$broadcast(AUTH_EVENTS.notAuthorized, {title:'Error', content: 'No posee permisos para esta accion'});
                $location.url(this.prevUrl)
                return true;
            }
        }

        this.prevUrl = $location.$$url;
    }
}

angular
    .module('app.auth.services')
    .service('AuthManager', AuthManager)
