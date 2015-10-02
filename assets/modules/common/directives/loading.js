"use strict";

function loading(Config){
    
    return {
        
        restrict: 'A',  
        
        scope: { drop:'&drop' },
        
        templateUrl: Config.STATIC + '/modules/common/views/loading.html',

        link: function(scope, element, attrs){
            var isShow = false;

            var show = function(){ 
                if(isShow == false){
                    isShow = true;
                    $('#loading-panel').addClass('display');
                }
                
            }

            var hide = function(){
                if(isShow == true){
                    isShow = false;
                    setTimeout(function(){
                        $('#loading-panel').removeClass('display');
                    }, 500);   
                }
            }

            scope.$on('loading-show2', show);
            scope.$on('loading-hide2', hide);
        },
    }
}

angular
    .module('app.common.directives')
    .directive('loading', loading);