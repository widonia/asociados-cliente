"use strict";

function PollService($resource, Config){

    var _url = Config.REST + '/polls/';
    var _urlA = Config.REST + '/questions/';
    
    return $resource(_url, {}, {
        get: { method:'GET'},
        post: { method:'POST', url:_url},
        put: { method:'PUT', params:{idPoll:"@idPoll"}, url:_url+':idPoll/'},
        options: { method:'OPTIONS'},
        delete: { method:'DELETE', params:{id:'@id'},url:_urlA+':id'},
        getOne: { method:'GET', params:{idPoll:"@idPoll"}, url:_url+':idPoll/'}, //Get one poll
        create: { method: 'POST', url:_urlA},
        edit: {method: 'PUT', params:{idQ:"@idQ"}, url:_urlA+':idQ/'},
        result: {method: 'GET', params:{idPoll:'@idPoll'}, url:_url+':idPoll/results/'},
        showResutlsByPoll: {method: 'GET', params:{idPoll:'@idPoll'}, url:_url+':idPoll/'},
        /*cvsPoll: {method: 'GET', params:{'idPoll': '@idPoll'}, url:_url+':idPoll/results_csv/'}*/
        cvsPoll: {method: 'GET', params:{'idPoll': '@idPoll'}, url:_url+':idPoll/results_excel/', responseType: "arraybuffer"}
    })
}

angular
    .module('app.poll.services')
    .factory('PollService', PollService);