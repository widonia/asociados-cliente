"use strict";

function AuthService($resource, Config){
    
    var _url = Config.REST + '/api/auth/';
    
    return $resource(_url, {}, {
        post: { method:'POST'},
        check: { method: 'GET', url:_url+'check/'}
    })
}

angular
    .module('app.auth.services')
    .factory('AuthService', AuthService)
