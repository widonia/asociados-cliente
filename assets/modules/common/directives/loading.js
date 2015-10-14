"use strict";

function loading(Config){
    
    return {
        
        restrict: 'A',  
        
        templateUrl: Config.STATIC + '/modules/common/views/loading.html',

        link: function(scope, element, attrs){
            console.log('aja');
            var request = 0

            var show = function(){ 
                if(request == 0){
                    $('#loading-panel').addClass('display');
                }
                request += 1;
            }


            var hide = function(){
                setTimeout(function(){
                    if(request == 0){
                        $('#loading-panel').removeClass('display');
                    }
                }, 500); 
                
                request -= (request == 0) ? 0 : 1;
            }

            scope.$on('loading-show2', show);
            scope.$on('loading-hide2', hide);
        },
    }
}

angular
    .module('app.common.directives')
    .directive('loading', loading);