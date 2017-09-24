"use strict";

function CRUDService($resource, Config){
    var _url = Config.REST + '/:object/:id/';
    
    return $resource(_url + '?fn=none', {}, {
        // get: { method:'GET'},
        // post: { method:'POST'},
        // put: { method:'PUT'},
        // delete: { mehod}
        delete: { method:'DELETE', url: _url}
    })
}

angular
    .module('app.common.services')
    .factory('CRUDService', CRUDService);
