"use strict";

function fileDrop(){
    
    return {
        restrict: 'A',  
        scope: { drop:'&drop' },
        link: function(scope, element, attrs){
            var addFile = scope.drop();

            var fileDragHover = function(e){
                e.stopPropagation();
                e.preventDefault();
            }

            var fileDrop = function(e){
                fileDragHover(e);
                scope.$apply(addFile(e));
            }

            element.bind("dragover", fileDragHover);
            element.bind("dragleave", fileDragHover);
            element.bind("drop", fileDrop);
        }
    }
}

angular
    .module('app.update.directives')
    .directive('fileDrop', fileDrop);