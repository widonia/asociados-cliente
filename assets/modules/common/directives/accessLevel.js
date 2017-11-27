"use strict";

function accessLevel($timeout){
    return {
        restrict: 'E',
        scope: {
            accessLevel: "=?level",
            lvl: "="
        },
        controller: accessLevelCtrl,
        link: link,
        templateUrl: '/modules/common/views/accessLevel.html'
    }
}

function accessLevelCtrl($scope){
    this.levels = [];
    
    $scope.setPrivacy = function(authLevel, lvl){
        // $scope.lvl = [];
        if(authLevel){
            console.log(authLevel)
            console.log(authLevel, lvl)
            $scope.lvl.push(lvl);
        }else if(!authLevel && $scope.lvl.indexOf(lvl) > -1){
            console.log(authLevel)
            console.log(authLevel, lvl)
            $scope.lvl.splice($scope.lvl.indexOf(lvl), 1);
        }
    }
}

function link($scope){
    var levels = {};
    setTimeout(function(){
    }, 1000);
}

angular
.module('app.common.directives')
.directive('accessLevel', accessLevel);