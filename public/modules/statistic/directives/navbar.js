"use strict";

function navBar(AUTH_EVENTS){
    
    return {
        
        restrict: 'A',

        template: '<div ng-if="visible" class="navbar navbar-default navbar-fixed-top" role="navigation" ng-include="\'/modules/home/views/navbar.html\'">',

        controller: function($scope, $location, AuthService, AuthManager, $rootScope, AUTH_EVENTS){
            $scope.logout = function(){
                AuthService.get();
            }

            $scope.onLogout = function(){
                $location.url('/login/');
            }

            $scope.visible = AuthManager.isLogin();
            $rootScope.$on(AUTH_EVENTS.logoutSuccess, $scope.onLogout);
        },

        link: function(scope){
            var show = function(){ 
                scope.visible = true; 
            }

            var hide = function(){ 
                scope.visible = false; 
            }

            scope.$on(AUTH_EVENTS.loginSuccess, show);
            scope.$on(AUTH_EVENTS.logoutSuccess, hide);
        }
    }
}

angular
    .module('app')
    .directive('navBar', navBar);