"use strict";

function AuthInterceptor($q, $rootScope, AUTH_EVENTS, AuthManager, Config){
    return {
        request:function(request){
            // console.log(" request " + request);
            // 
            $rootScope.$broadcast('loading-show2');
            var n = request.url.indexOf(Config.REST);
            if(n > -1){ 
                
                if(!request.cache){
                    request.url = fixURL(request.url);
                    request.url = addParameter(request.url, 'cooperative_id=' + AuthManager.get('cooperative'));

                    if(AuthManager.get('token') != undefined){
                        request.headers['Authorization'] = 'token '+AuthManager.get('token');
                    }
                }
            }

            return request;
        },

        response: function(response){
            // console.log(" response " + response);
            $rootScope.$broadcast('loading-hide2');
            // $rootScope.$broadcast(AUTH_EVENTS.loginSuccess, response.data);

            // if(response.data.code == '03'){
            //     $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
            // }

            return response;
        },

        responseError:function(response){            
            $rootScope.$broadcast('loading-hide2');
            if(response.status == 401){
                $rootScope.$broadcast(AUTH_EVENTS.notAuthenticated);
            }else if(response.status == 403){
                $rootScope.$broadcast(AUTH_EVENTS.notAuthorized, {title:'Error', content: 'No posee permisos para esta accion'});
            }else if(response.status == 400){
                // $rootScope.$broadcast("ERROR", 
                //     {
                //         title:'Request Error', 
                //         content: JSON.stringify(response.data,null, '\n')
                //     }
                // );
            }else if(response.status == 500){
                $rootScope.$broadcast("ERROR", 
                    {
                        title:'Error Interno', 
                        content: "El reporte se generó."
                    }
                );
            }

            if (response.config.url.indexOf(Config.DATA) > -1){
                console.log("hoñla");
                $rootScope.$broadcast("ERROR", 
                    {
                        title:'Estadisticas no disponibles', 
                        content: "Las estadisiticas no estan disponibles por el momento, intentenlo de nuevo más tarde."
                    }
                );
            }else{
                if(response.status == 0){
                    $rootScope.$broadcast("ERROR", 
                        {
                            title:'No Internet', 
                            content: "Error no hay conexión a internet."
                        }
                    );
                }    
            }
            

            return $q.reject(response);

        }
    }
}

angular
    .module('app.auth.services')
    .factory('AuthInterceptor', AuthInterceptor);
