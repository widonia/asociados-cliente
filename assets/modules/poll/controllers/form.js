"use strict";

function PollController($scope, PollService, action, $routeParams, SweetAlert){
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
    
    this.init = function(){
        if($scope.action != 'new'){
          $scope.getPoll();  
          $scope.created = true;
        }
    }
    
    // Get poll when if action value is edit
    $scope.getPoll = function(){
        PollService.getOne({idPoll}, $scope.getPollSuccess, $scope.getPollErr);
    }
    // If success, fill the form
    $scope.getPollSuccess = function(response){
        $scope.pollQuestions = response.question_set;
        console.log($scope.pollQuestions);
        
        if(response.state == 1){ //Set the poll state
            $scope.status = $scope.statusPoll[0];   
        }else{
            $scope.status = $scope.statusPoll[1];            
        }
        //Full a new object to put the type of the question in the edit form
        for(var i = 0; i<$scope.pollQuestions.length; i++){ 
            switch($scope.pollQuestions[i].type){
                case 2:
                    $scope.pollQuestions[i].actualType = $scope.typePoll[1];
                    break;
                case 3:
                    $scope.pollQuestions[i].actualType = $scope.typePoll[1];
                    break;
                default:
                    $scope.pollQuestions[i].actualType = $scope.typePoll[0];
            }
        }
        
        $scope.form = {
            name: response.name
        };
    }
    
    $scope.getPollErr = function(response){
        console.log(response);
        SweetAlert.swal("Ups!", "Tenemos un problema", "error");
    }
    
    // Action when the form is submitted
    $scope.submit = function(){
        $scope.form = {
            name: $scope.form.name,
            state: $scope.status.id
        };
        
        if($scope.action == 'new'){
            PollService.post($scope.form, $scope.onSubmitSuccess, $scope.onSubmitErr);
        }else{            
            var theForm = $scope.form;
            PollService.put({idPoll:idPoll}, theForm, $scope.onUpdateSuccess(), $scope.onUpdateErr);
        }
    }
    
    // new Poll
    $scope.onSubmitSuccess = function(response){
        $scope.created = true;
        SweetAlert.swal("¡Realizado!", "Acción realizada correctamente.", "success");
    }
    
    $scope.onSubmitErr = function(response){
        SweetAlert.swal("UPs!", "Al parecer hubo un problema", "error");
    }
    // Edit Poll
    $scope.onUpdateSuccess = function(response){
        console.log('response put:');
        console.log(response);
        SweetAlert.swal("¡Realizado!", "Acción realizada correctamente.", "success");
    }
    
    $scope.onUpdateErr = function(response){
        SweetAlert.swal("UPs!", "Al parecer hubo un problema", "error");
    }
    
    // Answers to questions
    $scope.answerToQuestion = function(quest, action){
        $scope.question = {
            content: quest.content,
            type: quest.actualType.id,
            poll: idPoll 
        }
        $scope.question.options = [];
        
        if($scope.question.type == 2 || $scope.question.type == 3){
            for(var i = 0; i<quest.option_set.length; i++){
                $scope.question.options.push(quest.option_set[i].content);
            }
        }
        
        $scope.action = action;
        
        if($scope.action == 'new'){
            console.log($scope.question);
            PollService.create($scope.question, $scope.onCreateSuccess, $scope.onCreateErr);
        }else{
            console.log('Editing');
            PollService.edit({idQ:quest.id}, $scope.question, $scope.onEditSuccess, $scope.onEditErr);
        }
    }
    // Create question
    $scope.onCreateSuccess = function(response){
        console.log(response);
        SweetAlert.swal("¡Realizado!", "Acción realizada correctamente.", "success");
    }
    
    $scope.onCreateErr = function(response){
        console.log(response);
        SweetAlert.swal("¡Ups!", "Sucedio algo inesperado.", "error");
    }
    // Edit Question
    $scope.onEditSuccess = function(response){
        SweetAlert.swal("¡Realizado!", "Acción realizada correctamente.", "success");
        console.log(response);
    }
    
    $scope.onEditErr = function(response){
        SweetAlert.swal("¡Ups!", "Sucedio algo inesperado.", "error");
        console.log(response);
    }
    
    // Show options if the question is type closed, close with comments and multiple choise
    $scope.showOptions = function(type){
        $scope.idTypePoll = type.id;
        if(type.id == 2 || type.id == 3){
            $scope.optionsAnswer = 1;
        }else $scope.optionsAnswer = 0;
    }
    
    this.init();
}

angular
    .module('app.poll.controllers')
    .controller('PollController', PollController);