"use strict";

function PollViewController($scope, PollService, $routeParams, $q, $http){
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
        $scope.answers = response.data;
        for(var i = 0; i<$scope.answers.length; i++){
            if($scope.answers[i].type == 'Close'){
                $scope.answers[i].type = 'Cerrada';
            }else if($scope.answers[i].type == 'Open'){
                $scope.answers[i].type = 'Abierta';
            }else{
                $scope.answers[i].type = 'Cerrada con comentarios';
            }
        }
    }
    
    $scope.getResultsErr = function(response){
        if(response.data.msg === "Poll no tiene questions relacionados.")
            $scope.messagePoll = true; 
    }

    $scope.getshowResutlsByPollSuccess = function(response){
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
    }

    $scope.getshowResutlsByPollErr = function(response){
    }

    // Download poll results like excel file
    $scope.downloadCvs = function(){
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://54.187.171.36/api/polls/37/results_excel/?cooperative_id=5', true);
        xhr.withCredentials = true;
        xhr.setRequestHeader('Authorization', 'token b55edd7a5f5b9e47cec057b1356bc0f22506dcc5')
        xhr.responseType = 'blob';

        xhr.onload = function(e) {
            if (this.status == 200) {
                var blob = new Blob([this.response], {
                    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8',
                    /*responseType: "arraybuffer"*/
                });
                var link = document.createElement('a');
                link.href = window.URL.createObjectURL(blob);
                link.download = "resultados.xlsx";
                link.click();       
            }
        };

        xhr.send();
    }

    $scope.downloadCvsError = function(response){
    }
    
    this.init();
}

angular
    .module('app.poll.controllers')
    .controller('PollViewController', PollViewController);      