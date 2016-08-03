"use strict";

function PollViewController($scope, PollService, $routeParams){
    var idPoll = $routeParams.id;
    $scope.answers = [];
    
    this.init = function(){
        $scope.getResults();
    }
    
    $scope.getResults = function(){
        PollService.result({idPoll}, $scope.getResultsSuccess, $scope.getResultsErr);
    }
    
    $scope.getResultsSuccess = function(response){
        $scope.answers = response.data;
        console.log(response.data.length);
        for(var i = 0; i<$scope.answers.length; i++){
            if($scope.answers[i].type == 'Close'){
                $scope.answers[i].type = 'Cerrada';
            }else if($scope.answers[i].type == 'Open'){
                $scope.answers[i].type = 'Abierta';
            }else{
                $scope.answers[i].type = 'Cerrada con comentarios';
            }
        }
        console.log($scope.answers);
    }
    
    $scope.getResultsErr = function(response){
        console.log(response);
    }
    
    this.init();
}

angular
    .module('app.poll.controllers')
    .controller('PollViewController', PollViewController);      