"use strict";

function NotificationService($resource, Config){
    var _url = Config.REST + '/api/notification_client/:id/';
    
    return $resource(_url + '?fn=none', {}, {
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
