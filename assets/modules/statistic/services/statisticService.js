"use strict";

function StatisticService($resource, Config, AuthManager){
    
    var _url = Config.DATA  + '/daily';
    
    
    return $resource(_url, {}, {
        get: { method:'GET'},
    })
}

angular
    .module('app.statistic.services')
    .factory('StatisticService', StatisticService);


