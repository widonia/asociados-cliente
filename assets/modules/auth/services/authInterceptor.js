"use strict";

function AuthInterceptor($q, $rootScope, AUTH_EVENTS, AuthManager){
    return {
        request:function(request){

            if(!request.cache){
                request.url = fixURL(request.url);
                request.url = addParameter(request.url, 'cooperative_id=' + AuthManager.get('cooperative'));

                if(AuthManager.get('token') != undefined){
                    request.headers['Authorization'] = 'token '+AuthManager.get('token');
                }
            }

            return request;
        },

        response: function(response){
            if(response.data.code == '01'){
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, response.data);
            }

            if(response.data.code == '03'){
                $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
            }

            return response;
        },

        responseError:function(response){
            console.log("error");
            if(response.status == 401){
                $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
            }

            if(response.status == 403){
                $rootScope.$broadcast(AUTH_EVENTS.notAuthorized, {title:'Error', content: 'No posee permisos para esta accion'});
            }

            return $q.reject(response);

        }
    }
}

angular
    .module('app.auth.services')
    .factory('AuthInterceptor', AuthInterceptor);
