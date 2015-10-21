"use strict";

function UpdateService($resource, Config){

    var _url = Config.REST + '/api/update/';
    
    return $resource(_url + '?', {}, {
        info: { method: 'GET', url:_url+'info', isArray:true}
    })
}

angular
    .module('app.update.services')
    .factory('UpdateService', UpdateService);
