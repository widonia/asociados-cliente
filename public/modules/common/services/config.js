// // if(ENV == 'Develop'){
//     angular.module('app.common.services').constant('Config', {
//         // REST: 'http://localhost:8000',
//         REST: 'http://54.187.171.36',
//         STATIC: 'http://localhost:4000/static/panel/',
//     });
// // }

// if(ENV == 'Stage'){
//     angular.module('app.common.services').constant('Config', {
//         REST: 'http://54.187.171.36',
//         STATIC: 'http://s3-us-west-2.amazonaws.com/asociados.stage/panel/',
//     });
// }


// if(ENV == 'Production'){
    // angular.module('app.common.services').constant('Config', {
    //     REST: 'http://www.asociados.com.co',
    //     STATIC: 'http://s3-us-west-2.amazonaws.com/asociados.prod/panel/',
    // });  
// }



// if(ENV == 'Develop'){
    angular.module('app.common.services').constant('Config', {
        // REST: 'http://localhost:8000',
        REST: 'http://54.187.171.36',
        STATIC: 'https://s3-us-west-2.amazonaws.com/asociados-client/public/',
    });
// }