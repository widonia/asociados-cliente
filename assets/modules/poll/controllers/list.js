"use strict";

function PollListController($scope){
    console.log("Poll: Who am I?");
}

angular
    .module('app.poll.controllers')
    .controller('PollListController', PollListController);