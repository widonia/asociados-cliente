if(ENV == 'Dev'){
    angular.module('app.common.services').constant('Config', {
        // REST: 'http://localhost:8000',
        REST: 'http://52.11.113.25',
        DATA: 'http://54.187.171.36:8000',
        // DATA: 'http://localhost:1337',
        STATIC: 'http://localhost:4000',
        MEDIA: 'http://192.168.0.22:8000/media'
    });
}

if(ENV == 'Stage'){
    angular.module('app.common.services').constant('Config', {
        REST: 'http://54.187.171.36/api/cliente',
        DATA: 'http://54.187.171.36/statistics',
        // STATIC: 'https://s3-us-west-2.amazonaws.com/asociados-client/stage', 
        STATIC: 'http://localhost:4000',
        MEDIA: 'https://s3-us-west-2.amazonaws.com/asociados.stage'
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
