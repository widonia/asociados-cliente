"use strict";

function DocumentService($resource, Config){
    
    var _url = Config.REST + '/api/document/:id/';
    
    return $resource(_url + '?', {}, {
        get: { method:'GET'},
        post: { method:'POST'},
        put: { method:'PUT'},
        delete: { method:'DELETE'}
    })
}

angular
    .module('app.document.services')
    .factory('DocumentService', DocumentService);
