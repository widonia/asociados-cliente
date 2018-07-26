"use strict";

function CreditRequestService($resource, Config){
    
    var _url = Config.REST + '/credit-request/:id/';
    
    return $resource(_url, {}, {
        get: { method:'GET'},
        proccess: { method:'PUT', url:_url + 'processed' , params: {id: "@id"}},
        put: { method:'PUT', url:_url , params: {id: "@id"}},
        download_data: { method:'GET', url: Config.REST + '/credit-request/download/'},        
        // post: { method:'POST'},
        // put: { method:'PUT'},
        // delete: { method:'DELETE'},
        
    })
}

angular
    .module('app.creditRequest.services')
    .factory('CreditRequestService', CreditRequestService);