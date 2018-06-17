"use strict";

function PollAnswerController($scope, $routeParams){
    var idQuestion = $routeParams.id;
}

angular
    .module('app.poll.controllers')
    .controller('PollAnswerController', PollAnswerController);