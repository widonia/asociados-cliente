if(ENV == 'Dev'){
    angular.module('app.common.services').constant('Config', {
        REST: 'http://54.187.171.36/api/cliente',
        DATA: 'http://54.187.171.36/statistics',
        STATIC: 'http://localhost:4000',
        // STATIC: 'https://s3-us-west-2.amazonaws.com/asociados.stage',
        MEDIA: 'https://s3-us-west-2.amazonaws.com/asociados.stage'
    });
}

if(ENV == 'Stage'){
    angular.module('app.common.services').constant('Config', {
        REST: 'http://www.administradorapp.com/api/cliente',
        DATA: 'http://www.administradorapp.com/statistics',
        // STATIC: 'https://s3-us-west-2.amazonaws.com/asociados-client/stage', 
        STATIC: 'https://s3-us-west-2.amazonaws.com/asociados-client/prod',
        MEDIA: 'https://s3-us-west-2.amazonaws.com/staticfiles-app'
    });
}

if(ENV == 'Prod'){
    angular.module('app.common.services').constant('Config', {
        REST: 'http://www.asociados.com.co',
        DATA: 'http://52.11.113.25/statistics',
        STATIC: 'https://s3-us-west-2.amazonaws.com/asociados-client/prod',
        MEDIA: 'https://s3-us-west-2.amazonaws.com/asociados.prod'
    });
}
