"use strict";

function navBar(AUTH_EVENTS, Config){
    
    return {
        
        restrict: 'A',

        template: '<div ng-if="visible" class="navbar navbar-default navbar-fixed-top" role="navigation" ng-include="\''+Config.STATIC+'/modules/home/views/navbar.html\'">',

        controller: function($scope, $location, AuthService, AuthManager, $rootScope, AUTH_EVENTS, Config){

            $scope.logout = function(){
                console.log(AuthManager.get('token'));
                AuthService.logout({}, $scope.onLogoutSuccess, $scope.onLogoutError);               
            }

            $scope.onLogout = function(){
                $location.url('/login/');
            }

            $scope.onLogoutSuccess = function(){
                AuthManager.logout(); 
                $location.url('/login/');
                $scope.visible = AuthManager.isAuth;
            }
            
            $scope.onLogoutError = function(){

            }

            $scope.static = Config.STATIC;
            // $scope.visible = AuthManager.isAuth;
            // $rootScope.$on(AUTH_EVENTS.logoutSuccess, $scope.onLogout);
        },

        link: function(scope){
            var show = function(){ 
                scope.visible = true; 
            }

            var hide = function(){ 
                scope.visible = false; 
            }

            scope.$on(AUTH_EVENTS.authSuccess, show);
            scope.$on(AUTH_EVENTS.logoutSuccess, hide);
        }
    }
}

angular
    .module('app')
    .directive('navBar', navBar);