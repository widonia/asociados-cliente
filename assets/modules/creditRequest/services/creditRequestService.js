"use strict";

function CreditRequestService($resource, Config){
    
    var _url = Config.REST + '/api/credit_request/:id/';
    
    return $resource(_url, {}, {
        get: { method:'GET'},
        proccess: { method:'POST', url:_url + 'processed' , params: {id: "@id"}},
        put: { method:'PUT', url:_url , params: {id: "@id"}},
        // post: { method:'POST'},
        // put: { method:'PUT'},
        // delete: { method:'DELETE'},
        
    })
}

angular
    .module('app.creditRequest.services')
    .factory('CreditRequestService', CreditRequestService);