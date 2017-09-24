"use strict";

function AuthService($resource, Config, AuthManager){
    
    var _url = Config.REST + '/auth/';
    
    return $resource(_url, {}, {
        post: { method:'POST', url:_url+"login/"},
        check: { method: 'GET', url:_url+'check/', headers: {"Authorization": AuthManager.get('token')}},
        logout: {method: 'POST', url:_url+"logout", headers: {"Authorization": AuthManager.get('token')}}
    })
}

angular
    .module('app.auth.services')
    .factory('AuthService', AuthService)
