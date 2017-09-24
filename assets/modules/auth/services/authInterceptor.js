"use strict";

function AuthInterceptor($q, $rootScope, AUTH_EVENTS, AuthManager, Config, SweetAlert){
    console.log(AuthManager.get('token'));
    return {
        request:function(request){
            // console.log(" request " + request);
            // 
            $rootScope.$broadcast('loading-show2');
            var n = request.url.indexOf(Config.REST);
            if(n > -1){ 
                
                if(!request.cache){
                    request.url = fixURL(request.url);
                    request.url = addParameter(request.url, 'entity_id=' + AuthManager.get('cooperative'));
                    request.headers['version'] = '2.0.0';

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
                SweetAlert.swal({
                    title: "Error",
                    text: "Ocurrió un error en nuestro servidor. El reporte fue generado. <br> Disculpa las molestias causadas.",
                    type: "error",
                    confirmButtonText: "Listo",
                    closeOnConfirm: true,
                   // imageUrl: "http:://oitozero.com/avatar/avatar.jpg" 
                });
            }
            console.log(Config.DATA);
            if (response.config.url.indexOf(Config.DATA) > -1){
                SweetAlert.swal({
                    title: "Estadísticas no disponibles",
                    text: "Las estadisiticas no estan disponibles por el momento, intentenlo de nuevo más tarde.",
                    type: "warning",
                    confirmButtonText: "Entiendo",
                    closeOnConfirm: true,
                   // imageUrl: "http:://oitozero.com/avatar/avatar.jpg" 
                });
            }else{
                if(response.status == 0){
                    SweetAlert.swal({
                        title: "Problema de conectividad",
                        text: "Error no hay conexión a internet.",
                        type: "warning",
                        confirmButtonText: "Entiendo",
                        closeOnConfirm: true,
                       // imageUrl: "http:://oitozero.com/avatar/avatar.jpg" 
                    });
                }    
            }
            

            return $q.reject(response);

        }
    }
}

angular
    .module('app.auth.services')
    .factory('AuthInterceptor', AuthInterceptor);
