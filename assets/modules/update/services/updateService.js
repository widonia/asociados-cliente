"use strict";

function UpdateService($resource, Config){

    var _url = Config.REST + '/api/update/:type';
    
    return $resource(_url + '?', {}, {
        post: { method:'POST'}
    })
}

angular
    .module('app.update.services')
    .factory('UpdateService', UpdateService);
