"use strict";

function AuthService($resource, Config){
    
    var _url = Config.REST + '/api/auth/';
    
    return $resource(_url, {}, {
        post: { method:'POST', url:_url+"login/"},
        check: { method: 'GET', url:_url+'check/'},
        logout: {method: 'GET', url:_url+"logout"},
    })
}

angular
    .module('app.auth.services')
    .factory('AuthService', AuthService)
