"use strict";

function UpdateService($resource, Config){

    var _url = Config.REST + '/api/update';
    
    return $resource(_url + '?', {}, {
        put: { method:'PUT'}
    })
}

angular
    .module('app.update.services')
    .factory('UpdateService', UpdateService);
