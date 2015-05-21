"use strict";

function SocialService($resource, Config){

    var _url = Config.REST + '/api/cooperative/social';
    
    return $resource(_url, {}, {
        get: { method:'GET' },
        put: { method:'PUT' }
    })
}

angular
    .module('app.cooperative.services')
    .factory('SocialService', SocialService);
