"use strict";

function TaskController($rootScope, TaskService, AuthManager){

    this.cosa = {"mierda":"mierda"}
    this.cooperative = AuthManager.get('cooperative');
    this.date = {};
    
    this.init = function(){
        this.getListStatus();
    }

    this.getListStatus = function(){
        TaskService.get({id:this.cooperative}, this.onGetList.bind(this));
    }

    this.onGetList = function(response){
        this.data = response.data;
    }

    this.init();
}

angular
    .module('app.tasks.controllers')
    .controller('TaskController', TaskController);
