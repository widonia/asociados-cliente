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
        console.log(oldVal);
        console.log(newVal);
        $scope.setDefault();
    })
    
    $scope.setDefault = function(){
        $scope.accessLevel.public = false;
        $scope.accessLevel.semiPublic = false;
        $scope.accessLevel.private = false;
        var check_public = document.getElementById("check_public");
        var check_private = document.getElementById("check_private");
        check_public.checked = false;
        check_private.checked = false;
    }
    
    $scope.setPrivacy = function(authLevel, lvl){
        var check_public = document.getElementById("check_public");
        var check_private = document.getElementById("check_private");

        console.log(check_private.value);
        console.log("change");
        console.log(lvl);
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