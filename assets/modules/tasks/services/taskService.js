"use strict";

function TaskService($resource, Config){
    var _url = Config.REST + '/api/cooperative/:id/tasks';
    
    return $resource(_url + '?fn=none&type=1', {}, {
        get: { method:'GET'},
    })
}

angular
    .module('app.tasks.services')
    .factory('TaskService', TaskService);
