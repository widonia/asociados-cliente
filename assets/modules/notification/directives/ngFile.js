"use strict";

function ngFile($parse){
    
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            var model = $parse(attrs.ngFile);
            var modelSetter = model.assign;
            
            element.bind('change', function(){

                scope.$apply(function(){
                    modelSetter(scope, element[0].files[0]);
                });
            });
        }
    };
}

angular
    .module('app.notification.directives')
    .directive('ngFile', ngFile);