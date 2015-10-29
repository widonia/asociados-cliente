"use strict";

function CooperativeService($resource, Config){

    var _url = Config.REST + '/api/cooperative/:id/';
    
    return $resource(_url, {}, {
        stats: { method:'GET', url:_url + 'stats'},
    })
}

angular
    .module('app.cooperative.services')
    .factory('CooperativeService', CooperativeService);
