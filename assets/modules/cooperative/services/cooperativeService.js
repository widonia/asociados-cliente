"use strict";

function CooperativeService($resource, Config){

    var _url = Config.REST + '/entity/:id/';
    
    return $resource(_url, {}, {
        stats: { method:'GET', url:_url + 'stats'},
        get: { method:'GET', url:_url},
        bad_emails: { method:'GET', url:_url + "bad_emails"},
        set_terms: { method:'POST', url:_url + "set_terms"},
    })
}

angular
    .module('app.cooperative.services')
    .factory('CooperativeService', CooperativeService);
