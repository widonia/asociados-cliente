"use strict";

function CreditService($resource, Config){
    
    var _url = Config.REST + '/credit/:id/';
    
    return $resource(_url, {}, {
        getAll: { method:'GET', url: Config.REST + '/credit/'},
        query: { method:'GET', url: Config.REST + 'credit-request/:id', params: {id: '@id'}},
        put: { method:'PUT'},        
    })
}

angular
    .module('app.credit.services')
    .factory('CreditService', CreditService);