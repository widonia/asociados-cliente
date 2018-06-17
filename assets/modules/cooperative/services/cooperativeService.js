"use strict";

function CooperativeService($resource, Config){

    var _url = Config.REST + '/entity/:id/';
    const _url2 = 'http://54.187.171.36/api/entity/?entity_id=:id'
    
    return $resource(_url, {}, {
        stats: { method:'GET', url:_url + 'stats'},
        get: { method:'GET', url:_url},
        bad_emails: { method:'GET', url:_url + "bad_emails"},
        set_terms: { method:'POST', url:_url + "set_terms"},
        get_terms: { method:'GET', url:Config.REST + '/entity/terms'},
        update_terms: {method: 'PUT', url: Config.REST + '/entity/save_terms'},
        getLogo : {method: 'GET', url: 'http://54.187.171.36/api/entity/terms/?entity_id=:id', headers: {'version': '2.0.0'}}
    })
}

angular
    .module('app.cooperative.services')
    .factory('CooperativeService', CooperativeService);
