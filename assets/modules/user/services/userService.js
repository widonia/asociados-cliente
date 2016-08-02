"use strict";

function UserService($resource, Config){

    var _url = Config.REST + '/api/user/:id/';
    
    return $resource(_url, {}, {
        cooperative: { method:'GET', url: Config.REST + '/api/usercooperative/?fn=none'},
        // request: { method:'GET', url:_url+'request/:id/?fn=none'},
        // data: { method:'GET', url:_url+'?fn=none'},
        suggest: { method:'GET', url:_url+'suggest/?fn=none'},
        download_data: { method:'GET', url:_url+'download/'},
        put: { method:'PUT'},
        imageReview: {method: 'GET', url:Config.REST + '/api/user/image_revision'},
        rejectImage: {method: 'PUT', url:Config.REST + '/api/user/replace_image_revision/', headers: {'Content-Type': undefined }}
    })
}

angular
    .module('app.user.services')
    .factory('UserService', UserService)