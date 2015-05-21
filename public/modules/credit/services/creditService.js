"use strict";

function CreditService($resource, Config){
    
    var _url = Config.REST + '/api/credit/request/:id/';
    
    return $resource(_url, {}, {
        get: { method:'GET'},
        post: { method:'POST'},
        put: { method:'PUT'},
        delete: { method:'DELETE'}
    })
}

angular
    .module('app.credit.services')
    .factory('CreditService', CreditService);


    
// function StatisticService($resource, Config){
    
//     var _url = Config.REST + '/api/statistic/:date/';
    
//     return $resource(_url, {}, {
//         get: { method:'GET'},
//     })
// }

// angular
//     .module('app.statistic.services')
//     .factory('StatisticService', StatisticService);

