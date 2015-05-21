"use strict";

function StatisticService($resource, Config){
    
    var _url = Config.REST + '/api/statistic/:date/';
    
    return $resource(_url, {}, {
        get: { method:'GET'},
    })
}

angular
    .module('app.statistic.services')
    .factory('StatisticService', StatisticService);


