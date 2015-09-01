if(ENV == 'Dev'){
    angular.module('app.common.services').constant('Config', {
        REST: 'http://localhost:8000',
        STATIC: 'http://localhost:4000',
    });
}

if(ENV == 'Stage'){
    angular.module('app.common.services').constant('Config', {
        REST: 'http://54.187.171.36',
        STATIC: 'https://s3-us-west-2.amazonaws.com/asociados-client/stage',
    });
}

if(ENV == 'Prod'){
    angular.module('app.common.services').constant('Config', {
        REST: 'http://52.11.113.25',
        STATIC: 'https://s3-us-west-2.amazonaws.com/asociados-client/prod',
    });
}
