"use strict";

function SocialService($resource, Config){

    var _url = Config.REST + '/social/:id';

    
    return $resource(_url + '?fn=none', {}, {
        get: { method:'GET' },
        query: { method:'GET' , isArray:true},
        put: { method:'PUT' },
        post: { method:'POST' },
        'delete' : { method:'DELETE' },
        options: { method:'OPTIONS' },
    })
}

angular
    .module('app.cooperative.services')
    .factory('SocialService', SocialService);
