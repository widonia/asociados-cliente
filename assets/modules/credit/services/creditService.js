"use strict";

function CreditService($resource, Config){
    
    var _url = Config.REST + '/api/credit_request/:id/';
    
    return $resource(_url, {}, {
        get: { method:'GET'},
        post: { method:'POST'},
        put: { method:'PUT'},
        delete: { method:'DELETE'},
        proccess: { method:'POST', url:_url + 'processed' , params: {id: "@id"}},
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

