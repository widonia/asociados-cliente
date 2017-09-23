"use strict";

function UserService($resource, Config){

    var _url = Config.REST + '/user/:id/';
    
    return $resource(_url, {}, {
        cooperative: { method:'GET', url: Config.REST + '/auth/entities/?fn=none'},
        suggest: { method:'GET', url:_url+'suggest/?fn=none'},
        download_data: { method:'GET', url:_url+'download/'},
        put: { method:'PUT'},
        imageReview: {method: 'GET', url:Config.REST + '/user/image_revision'},
        rejectImage: {method: 'PUT', url:Config.REST + '/user/replace_image_revision/', headers: {'Content-Type': undefined }},
        listImageRevision: {method: 'GET', url: Config.REST + '/user/list_image_revision'}
    })
}

angular
    .module('app.user.services')
    .factory('UserService', UserService)