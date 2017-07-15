"use strict";

function PollController($scope, PollService, action, $routeParams, SweetAlert, $window){
    $scope.action = action;
    var idPoll = $routeParams.id;
    $scope.statusPoll = [
      {id:1, name:'Activa'},
      {id:2, name:'Inactiva'},
    ];
    $scope.form = {};
    $scope.created = false; //Flag, to show the form to add questions
    $scope.typePoll = [ //Poll's types
        {id: 1, name:'Abierta'},
        {id:2, name:'Cerrada'},
        {id:3, name:'Cerrada con comentarios'},
        // {id:4, name:'Respuesta multiple'},
    ]
    $scope.question = {};
    $scope.optionsAnswer = 0;
    $scope.idTypePoll;
    $scope.addOptions = false; //flag to a add optiones to questios type 2 and 3
    $scope.hours = [];
    $scope.disable = false;
    
    this.init = function(){
        if($scope.action != 'new'){
          $scope.getPoll();  
          $scope.created = true;
        }

        for(var i=1; i<24; i++){
            $scope.hours[i] = i + ':00';
        }
   
    }
    
    // Get poll it $scope.action value is edit
    $scope.getPoll = function(){
        PollService.getOne({idPoll}, $scope.getPollSuccess, $scope.getPollErr);
    }
    // If success, fill the form with the poll and the answers
    $scope.getPollSuccess = function(response){
        console.log(response);
        $scope.pollQuestions = response.question_set;
        
        if(response.state == 1){ //Set the poll state
            $scope.status = $scope.statusPoll[0];   
        }else{
            $scope.status = $scope.statusPoll[1];            
        }
        //Fill a new object to put the type of the question in the edit form's selects
        for(var i = 0; i<$scope.pollQuestions.length; i++){ 
            switch($scope.pollQuestions[i].type){
                case 2:
                    $scope.pollQuestions[i].actualType = $scope.typePoll[1];
                    break;
                case 3:
                    $scope.pollQuestions[i].actualType = $scope.typePoll[2];
                    break;
                default:
                    $scope.pollQuestions[i].actualType = $scope.typePoll[0];
            }
            $scope.pollQuestions[i].sizeOptions = $scope.pollQuestions[i].option_set.length;

            if($scope.pollQuestions[i].option_set.length > 0){
                $scope.addOptions = false; 
            }

            if($scope.pollQuestions[i].users_response.length > 0){
                $scope.disable = true;
            }
        }
        
        $scope.form = { 
            name: response.name,
            date_start: response.date_start.slice(0,10),
            hoursPublish: response.date_start.slice(11,16)
        };
        console.log($scope.form)
    }
    
    $scope.getPollErr = function(response){
        SweetAlert.swal("Ups!", "Tenemos un problema", "error");
    }
    
    // Do the new or edit petition when the form is submitted
    $scope.submit = function(){
        console.log($scope.form.hoursPublish);
        if($scope.form.name == undefined){
            SweetAlert.swal("Ups!", "El nombre de la encuesta es obligatorio.", "error");
        }else if($scope.form.date_start == undefined || $scope.form.hoursPublish == undefined){
            SweetAlert.swal("Ups!", "La fecha y la hora son obligatorios.", "error");
        }else{
            var dataPoll = {
                name: $scope.form.name,
                state: $scope.status.id,
                date_start: $scope.form.date_start + ' ' + $scope.form.hoursPublish
            };
            
            if($scope.action == 'new'){
                PollService.post(dataPoll, $scope.onSubmitSuccess, $scope.onSubmitErr);
            }else{
                var theForm = dataPoll;
                console.log(theForm)
                PollService.put({idPoll:idPoll}, theForm, $scope.onUpdateSuccess(), $scope.onUpdateErr);
            }
        }
    }
    
    // If action is equal to new Poll
    $scope.onSubmitSuccess = function(response){
        // SweetAlert.swal("¡Realizado!", "Acción realizada correctamente.", "success");

        SweetAlert.swal({
            title: "¡Realizado!",
            text: "Acción realizada correctamente.",
            type: "success",
            showCancelButton: false,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Ok",
            closeOnConfirm: true,
        },
        function(isConfirm){
            if (isConfirm) {
                $window.location.href = '/#/poll'; //localhost
                // $window.location.href = '/cliente/#/poll'; //Server
            }
        });
    }
    
    $scope.onSubmitErr = function(response){
        SweetAlert.swal("UPs!", "Al parecer hubo un problema", "error");
    }
    // Edit Poll
    $scope.onUpdateSuccess = function(response){
        console.log(response);
        SweetAlert.swal("¡Realizado!", "Acción realizada correctamente.", "success");
    }
    
    $scope.onUpdateErr = function(response){
        SweetAlert.swal("UPs!", "Al parecer hubo un problema", "error");
    }
    
    // Answers to questions
    $scope.answerToQuestion = function(quest, action){
        console.log(quest)
        console.log(action)
        $scope.question = {
            content: quest.content,
            type: quest.actualType.id,
            poll: idPoll 
        }
        $scope.question.options = [];
        
        $scope.action = action;
        
        if($scope.action == 'new'){
            if($scope.question.type == 2 || $scope.question.type == 3){
                $scope.question.options.push(quest.option1);
                $scope.question.options.push(quest.option2);
                $scope.question.options.push(quest.option3);
                $scope.question.options.push(quest.option4);
                $scope.question.options.push(quest.option5);
            }
            PollService.create($scope.question, $scope.onCreateSuccess, $scope.onCreateErr);
            $scope.optionsAnswer = 0;
        }else{
            if($scope.question.type == 2 || $scope.question.type == 3){
                if(quest.option_set.length == 0){
                    $scope.question.options.push(quest.option1);
                    $scope.question.options.push(quest.option2);
                    $scope.question.options.push(quest.option3);
                    $scope.question.options.push(quest.option4);
                    $scope.question.options.push(quest.option5);
                }else{
                    for(var i = 0; i<quest.option_set.length; i++){
                        $scope.question.options.push(quest.option_set[i].content);
                    }
                }
            }
            PollService.edit({idQ:quest.id}, $scope.question, $scope.onEditSuccess, $scope.onEditErr);
        }
        $scope.quest = {};
    }
    // Create question
    $scope.onCreateSuccess = function(response){
        $scope.created = true;
        $scope.getPoll();
        SweetAlert.swal("¡Realizado!", "Acción realizada correctamente.", "success");
    }
    
    $scope.onCreateErr = function(response){
        SweetAlert.swal("¡Ups!", "Sucedio algo inesperado.", "error");
    }
    // Edit Question
    $scope.onEditSuccess = function(response){
        $scope.getPoll();
        SweetAlert.swal("¡Realizado!", "Acción realizada correctamente.", "success");
    }
    
    $scope.onEditErr = function(response){
        SweetAlert.swal("¡Ups!", "Sucedio algo inesperado.", "error");
    }
    
    // Show options if the question is type closed, close with comments and multiple choise
    $scope.showOptions = function(actualType){
        console.log(actualType);
        console.log(actualType.id);
        $scope.idactualTypePoll = actualType.id;
        $scope.typePoll.type = actualType.id;
        if(actualType.id == 2 || actualType.id == 3){
            $scope.optionsAnswer = 1;
        }else $scope.optionsAnswer = 0;
    }

    $scope.deleteQuestion = function(id){
        PollService.delete({'id': id}, $scope.onDeleteQuestionSuccess, $scope.onDeleteQuestionErr);
    }
    
    $scope.onDeleteQuestionSuccess = function(response){
        $scope.getPoll();
        SweetAlert.swal("¡Realizado!", "La pregunta se ha borrado correctamente.", "success");
    }

    $scope.onDeleteQuestionErr = function(response){
        SweetAlert.swal("Ups!", "Sucedio algo inesperado, inténtalo de nuevo.", "error");
    }

    this.init();
}

angular
    .module('app.poll.controllers')
    .controller('PollController', PollController);