"use strict";

function UserlistImageCtrl($scope, $rootScope, UserService, SweetAlert){

    $scope.user = [];

    this.init = function(){
        UserService.listImageRevision(this.onImageSuccess, this.onImageError);
    }

    this.onImageSuccess = function(response){
        $scope.user = response.data;
    }

    this.onImageError = function(response){
    }

    this.init();
}


angular
    .module('app.user.controllers')
    .controller('UserlistImageCtrl', UserlistImageCtrl);