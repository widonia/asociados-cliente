if(ENV == 'Dev'){
    angular.module('app.common.services').constant('Config', {
        // REST: 'http://54.187.171.36',
        REST: 'http://localhost:8000',
<<<<<<< HEAD
        STATIC: 'http://localhost:4000',    
        MEDIA: 'https://s3-us-west-2.amazonaws.com/asociados.stage'
=======
        // REST: 'http://52.11.113.25',
        // REST: 'http://54.187.171.36',
        DATA: 'http://localhost:1337',
        STATIC: 'http://localhost:4000',
        // MEDIA: 'http://localhost:8000/media',
        MEDIA: 'https://s3-us-west-2.amazonaws.com/asociados.prod'
>>>>>>> d2a0091f700b0fd97d434c9c091ce9a940bc3fc8
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
