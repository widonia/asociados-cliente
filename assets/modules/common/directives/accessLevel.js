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
        if(authLevel){
            $scope.lvl.push(lvl);
        }else if(!authLevel && $scope.lvl.indexOf(lvl) > -1){
            $scope.lvl.splice($scope.lvl.indexOf(lvl), 1);
        }
    }
}

function link($scope){
    var levels = {};
    setTimeout(function(){
        console.log($scope.lvl);

    }, 1000);
}

angular
.module('app.common.directives', [])
.directive('accessLevel', accessLevel);