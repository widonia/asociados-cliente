if(ENV == 'Dev'){
    angular.module('app.common.services').constant('Config', {
        // REST: 'http://localhost:8000',
        REST: 'http://52.11.113.25',
        // REST: 'http://54.187.171.36',
        DATA: 'http://localhost:1337',
        STATIC: 'http://localhost:4000',
        // MEDIA: 'http://localhost:8000/media',
        MEDIA: 'https://s3-us-west-2.amazonaws.com/asociados.prod'
    });
}

if(ENV == 'Stage'){
    angular.module('app.common.services').constant('Config', {
        REST: 'http://54.187.171.36',
        DATA: 'http://54.187.171.36/statistics',
        STATIC: 'https://s3-us-west-2.amazonaws.com/asociados-client/stage',        
        MEDIA: 'https://s3-us-west-2.amazonaws.com/asociados.stage'
    });
}

if(ENV == 'Prod'){
    angular.module('app.common.services').constant('Config', {
        REST: 'http://52.11.113.25',
        DATA: 'http://52.11.113.25/statistics',
        STATIC: 'https://s3-us-west-2.amazonaws.com/asociados-client/prod',
        MEDIA: 'https://s3-us-west-2.amazonaws.com/asociados.prod'
    });
}
