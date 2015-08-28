"use strict";

function GroupsService($resource, Config){
    var _url = Config.REST + '/api/group/:id/';
    
    return $resource(_url + '?fn=none', {}, {
        post: { method:'POST'},
        patch: { method:'PATCH'},
        //fill: { method:'POST', url: _url*'fill_users/?fn=none'},
        delete: { method:'DELETE'}
    })
}

angular
    .module('app.groups.services')
    .factory('GroupsService', GroupsService);
