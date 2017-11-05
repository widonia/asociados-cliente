"use strict";

function GroupsService($resource, Config){
    var _url = Config.REST + '/group/:id/';
    
    return $resource(_url + '?fn=none', {}, {
        post: { method:'POST'},
        patch: { method:'PUT'},
        delete: { method:'DELETE'},
        groupId: {method: 'GET', url: _url + 'user_list/'}
    })
}

angular
    .module('app.groups.services')
    .factory('GroupsService', GroupsService);
