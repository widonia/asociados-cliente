"use strict";

function PageService($resource, Config){
    
    var _url = Config.REST + '/api/pages/:id/';
    
    return $resource(_url + '?fn=none', {}, {
        get: { method:'GET'},
        post: { method:'POST'},
        put: { method:'PUT'},
        delete: { method:'DELETE'}
    })
}

angular
    .module('app.page.services')
    .factory('PageService', PageService);
