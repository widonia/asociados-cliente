"use strict";

function PollAnswerController($scope, $routeParams){
    console.log('Answers');
    var idQuestion = $routeParams.id;
}

angular
    .module('app.poll.controllers')
    .controller('PollAnswerController', PollAnswerController);