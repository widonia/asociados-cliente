"use strict";

function PollViewController($scope, PollService, $routeParams){
    var idPoll = $routeParams.id;
    $scope.answers = [];
    $scope.messagePoll = false;
    $scope.colors = ['#C37736', '#5E958D', '#78A44A'];
    $scope.labels = ['Si', 'No'];
    
    this.init = function(){
        $scope.getResults();
    }
    
    $scope.getResults = function(){
        // PollService.result({idPoll}, $scope.getResultsSuccess, $scope.getResultsErr);
        PollService.showResutlsByPoll({idPoll}, $scope.getshowResutlsByPollSuccess, $scope.getshowResutlsByPollErr)
    }
    
    $scope.getResultsSuccess = function(response){
        console.log(response);
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
        if(response.data.msg === "Poll no tiene questions relacionados.")
            $scope.messagePoll = true; 
    }

    $scope.getshowResutlsByPollSuccess = function(response){
        console.log(response);
        var listanswers = response.data;
        var temporalAnswers = [];
        var answers = [];
        $scope.answers = [];
        
        /**
            * Fill the array with all the data to put in the chart
            * This one is a multidimensional array
            * Here is the structure.
            * answers = [ [ [0], [1] ], [ [0], [1] ], [ [0], [1] ] ]
        */  
        for(var i=0; i<listanswers.length; i++){
            for(var tm in listanswers[i].answers){
                if(listanswers[i].answers.hasOwnProperty(tm))
                    temporalAnswers.push(listanswers[i].answers[tm])
            }
            answers.push(temporalAnswers);
            // Empty array to add the new answers
            temporalAnswers = [];
            // Create an array to do the data-binding and to iterate in the view
            if(answers[i].length != 0){
                $scope.answers.push({
                    questions: listanswers[i].question,
                    answers: answers[i]
                })
            }
        }
        $scope.data = answers;
        console.log($scope.answers);
    }

    $scope.getshowResutlsByPollErr = function(response){
        console.log(response);
    }

    // Download poll results like CVS
    $scope.downloadCvs = function(){
        PollService.cvsPoll({idPoll}, $scope.downloadCvsSuccess, $scope.downloadCvsError);
    }

    $scope.downloadCvsSuccess = function(response){
        console.log(response);
        // var arrayResponse = [response];
        // console.log(arrayResponse)
        // console.log(typeof response);
        // console.log(Object.keys( response ).length);

        JSONToCSVConvertor(response, "1Encuestas", true);
    }

    $scope.downloadCvsError = function(response){
        console.log(response);
    }
    
    this.init();
}

angular
    .module('app.poll.controllers')
    .controller('PollViewController', PollViewController);      