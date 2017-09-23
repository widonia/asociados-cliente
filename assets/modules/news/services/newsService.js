"use strict";

function NewsService($resource, Config){
    
    var _url = Config.REST + '/news/:id/';
    
    return $resource(_url, {}, {
        get: { method:'GET'},
        post: { method:'POST'},
        put: { method:'PUT'},
        delete: { method:'DELETE'}
    })
}

angular
    .module('app.news.services')
    .factory('NewsService', NewsService);
