"use strict";

function StatisticService($resource, Config){
    
    var _url = 'http://localhost:1337/daily';
    
    return $resource(_url, {}, {
        get: { method:'GET'},
    })
}

angular
    .module('app.statistic.services')
    .factory('StatisticService', StatisticService);


