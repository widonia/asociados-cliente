"use strict";

function NotificationService($resource, Config){
    var _url = Config.REST + '/notification/:id/';
    console.log("_url");
    console.log(_url);
    
    return $resource(_url + '?fn=none&type=1', {}, {
        get: { method:'GET'},
        post: { method:'POST'},
        put: { method:'PATCH'},
        // add_image: { method:'PUT', url:_url + 'add_image'},
        delete: { method:'DELETE'}
    })
}

angular
    .module('app.notification.services')
    .factory('NotificationService', NotificationService);
