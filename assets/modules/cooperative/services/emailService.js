"use strict";

function EmailService($resource, Config){

    var _url = Config.REST + '/entity/email/:id/';
    
    return $resource(_url, {}, {
        get: { method:'GET'},
        post: { method:'POST'},
        put: { method:'PUT'},
        options: { method:'OPTIONS'},
        delete: { method:'DELETE'}
    })
}

angular
    .module('app.cooperative.services')
    .factory('EmailService', EmailService);
