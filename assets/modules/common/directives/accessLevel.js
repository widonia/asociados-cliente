"use strict";

function accessLevel($timeout){
    return {
        restrict: 'E',
        scope: {
            accessLevel: "=?level",
            lvl: "=",
            section: "="
        },
        controller: accessLevelCtrl,
        link: link,
        templateUrl: '/modules/common/views/accessLevel.html'
    }
}

function accessLevelCtrl($scope){
    this.levels = [];

    $scope.$watch('accessLevel', function(oldVal, newVal){
        
    })
    
    $scope.setDefault = function(){
        $scope.accessLevel.public = false;
        $scope.accessLevel.semiPublic = false;
        $scope.accessLevel.private = false;
    }
    
    $scope.setPrivacy = function(authLevel, lvl){
        if(authLevel){
            $scope.lvl.push(lvl);
        }else if(!authLevel && $scope.lvl.indexOf(lvl) > -1){
            $scope.lvl.splice($scope.lvl.indexOf(lvl), 1);
        }
    }
    $scope.setDefault();
}

function link($scope){
    var levels = {};
    setTimeout(function(){
    }, 1000);
}

angular
.module('app.common.directives')
.directive('accessLevel', accessLevel);