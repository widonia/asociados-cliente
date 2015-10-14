"use strict";

function CRUDService($resource, Config){
    var _url = Config.REST + '/api/:object/:id/';
    
    return $resource(_url + '?fn=none', {}, {
        // get: { method:'GET'},
        // post: { method:'POST'},
        // put: { method:'PUT'},
        // delete: { mehod}
        // delete: { method:'DELETE'}
    })
}

angular
    .module('app.common.services')
    .factory('CRUDService', CRUDService);
