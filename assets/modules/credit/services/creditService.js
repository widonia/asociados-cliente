"use strict";

function CreditService($resource, Config){
    
    var _url = Config.REST + '/api/credit/:id/';
    
    return $resource(_url, {}, {
        // get: { method:'GET'},
        // proccess: { method:'POST', url:_url + 'processed' , params: {id: "@id"}},
        // post: { method:'POST'},
        put: { method:'PUT'},
        // delete: { method:'DELETE'},
        
    })
}

angular
    .module('app.credit.services')
    .factory('CreditService', CreditService);