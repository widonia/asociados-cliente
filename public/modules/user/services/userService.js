"use strict";

function UserService($resource, Config){

    var _url = Config.REST + '/api/user/';
    
    return $resource(_url, {}, {
        cooperative: { method:'GET', url:_url+'cooperative/?fn=none'},
        request: { method:'GET', url:_url+'request/:id/?fn=none'},
        data: { method:'GET', url:_url+'?fn=none'},
        suggest: { method:'GET', url:_url+'suggest/?fn=none'},
    })
}

angular
    .module('app.user.services')
    .factory('UserService', UserService)