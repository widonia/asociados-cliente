"use strict";

function CooperativeService($resource, Config){

    var _url = Config.REST + '/api/cooperative/:id/';
    
    return $resource(_url, {}, {
        stats: { method:'GET', url:_url + 'stats'},
        get: { method:'GET', url:_url},
    })
}

angular
    .module('app.cooperative.services')
    .factory('CooperativeService', CooperativeService);
