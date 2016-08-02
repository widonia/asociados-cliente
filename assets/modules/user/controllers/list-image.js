"use strict";

function UserlistImageCtrl($scope, $rootScope, UserService, SweetAlert){

    $scope.user = [];

    this.init = function(){
        UserService.listImageRevision(this.onImageSuccess, this.onImageError);
    }

    this.onImageSuccess = function(response){
        console.log(response.data);
        $scope.user = response.data;
    }

    this.onImageError = function(response){
        console.log(response);
    }

    this.init();
}


angular
    .module('app.user.controllers')
    .controller('UserlistImageCtrl', UserlistImageCtrl);