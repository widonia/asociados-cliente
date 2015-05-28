"use strict";

function NotificationService($resource, Config){
    var _url = Config.REST + '/api/notifications/:id/';
    
    return $resource(_url + '?fn=none', {}, {
        get: { method:'GET'},
        post: { method:'POST'},
        put: { method:'PUT'},
        delete: { method:'DELETE'}
    })
}

angular
    .module('app.notification.services')
    .factory('NotificationService', NotificationService);
