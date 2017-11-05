"use strict";

function accessLevel(){
    return {
        restrict: 'E',
        $scope: {
            accessLevel: "="
        },
        templateUrl: '/modules/common/views/accessLevel.html',
        controller: accessLevelCtrl,
        controllerAs: 'accessLevel'
    }
}

function accessLevelCtrl($scope){
    this.accessLevel = $scope.accessLevel;
    
    this.levels = [];

    this.setPrivacy = function(level){
        if(this.levels.indexOf(level) === -1){
            this.levels.push(level);
        }
        console.log("this.level");
        console.log(this.levels);
    }
}

angular
.module('app.common.directives')
.directive('accessLevel', accessLevel);