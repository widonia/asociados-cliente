"use strict";

function CreditService($resource, Config){
    
    var _url = Config.REST + '/credit/:id/';
    
    return $resource(_url, {}, {
        getAll: { method:'GET', url: Config.REST + '/credit/'},
        // proccess: { method:'POST', url:_url + 'processed' , params: {id: "@id"}},
        // post: { method:'POST'},
        put: { method:'PUT'},
        // delete: { method:'DELETE'},
        
    })
}

angular
    .module('app.credit.services')
    .factory('CreditService', CreditService);