"use strict";

function modal(AUTH_EVENTS, Config){
    
    return {
        
        restrict: 'A',

        templateUrl: Config.STATIC + '/modules/home/views/modal.html',

        link: function(scope, element){

            var show = function(event, data){ 
                scope.title = data.title;
                scope.content = data.content;
                $('#modal-alert').modal('show')
            }

            scope.title = ''; 
            scope.content = ''; 

            scope.$on(AUTH_EVENTS.notAuthorized, show);
            scope.$on("ERROR", show);
        }
    }
}

angular
    .module('app')
    .directive('modal', modal);