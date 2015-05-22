"use strict";

angular.module('app', [

	// angular modules
	'ngRoute', 
    'ui.bootstrap', 
	'ngResource', 
    'angularFileUpload',
    'ui.tinymce',

	// app modules
	'app.auth',
	'app.page', 
    'app.news',
    'app.document',
    'app.update',
    'app.credit',
    'app.user',
    'app.notification',
    'app.common',
    'app.cooperative',
    'app.statistic',
])

.config(['$routeProvider', '$httpProvider',  '$locationProvider', '$sceDelegateProvider', 'AUTH_ROLES', 'Config',

	function($routeProvider, $httpProvider, $locationProvider, $sceDelegateProvider, AUTH_ROLES, Config){

        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',
            // Allow loading from our assets domain.  Notice the difference between * and **.
            'http://s3-us-west-2.amazonaws.com/**',
            'http://localhost:4000/**',
            'http://localhost:4000/*',
            'http://localhost:4000/',
            'http://localhost:4000',




        ]);

		//auth interceptor
		$httpProvider.interceptors.push('AuthInterceptor');

		$routeProvider

            .when('/', {
                templateUrl: Config.STATIC + 'modules/home/views/home.html',
                controller: 'HomeCtrl', controllerAs: 'home', role:AUTH_ROLES.monitor
            })

            //news urls
			.when('/content/news', {
                templateUrl: Config.STATIC + 'modules/news/views/list.html',
                controller: 'NewsListCtrl', controllerAs: 'newsList', role:AUTH_ROLES.monitor
			})

            .when('/content/news/new', {
                templateUrl: Config.STATIC + 'modules/news/views/form.html',
                controller: 'NewsFormCtrl', controllerAs: 'news', role:AUTH_ROLES.editor,
                resolve: {
                    action: function(){return 'new';}
                }
            })
            
            .when('/content/news/edit/:id', {
                templateUrl: Config.STATIC + 'modules/news/views/form.html',
                controller: 'NewsFormCtrl', controllerAs: 'news', role:AUTH_ROLES.editor,
                resolve: {
                    action: function(){return 'edit';}
                }
            })

            //page urls
			.when('/content/page', {
				templateUrl: Config.STATIC + 'modules/page/views/list.html',
                controller: 'PageListCtrl', controllerAs: 'pageList', role:AUTH_ROLES.monitor
			})

            .when('/content/page/new', {
                templateUrl: Config.STATIC + 'modules/page/views/form.html',
                controller: 'PageFormCtrl', controllerAs: 'page', role:AUTH_ROLES.editor,
                resolve: {
                    action: function(){return 'new';}
                }
            })
            
            .when('/content/page/edit/:id', {
                templateUrl: Config.STATIC + 'modules/page/views/form.html',
                controller: 'PageFormCtrl', controllerAs: 'page', role:AUTH_ROLES.editor,
                resolve: {
                    action: function(){return 'edit';}
                }
            })

            // cooperative url
            .when('/cooperative/email', {
                templateUrl: Config.STATIC + 'modules/cooperative/views/email.html',
                controller: 'EmailListCtrl', controllerAs: 'emailList', role:AUTH_ROLES.admin
            })

            .when('/cooperative/email/new', {
                templateUrl: Config.STATIC + 'modules/cooperative/views/email-form.html',
                controller: 'EmailFormCtrl', controllerAs: 'email', role:AUTH_ROLES.editor,
                resolve: {
                    action: function(){return 'new';}
                }
            })
            
            .when('/cooperative/email/edit/:id', {
                templateUrl: Config.STATIC + 'modules/cooperative/views/email-form.html',
                controller: 'EmailFormCtrl', controllerAs: 'email', role:AUTH_ROLES.editor,
                resolve: {
                    action: function(){return 'edit';}
                }
            })

            .when('/cooperative/social', {
                templateUrl: Config.STATIC + 'modules/cooperative/views/social-form.html',
                controller: 'SocialFormCtrl', controllerAs: 'social', role:AUTH_ROLES.editor,
            })

            .when('/cooperative/update', {
                templateUrl: Config.STATIC + 'modules/update/views/index.html',
                controller: 'UpdateIndexCtrl', controllerAs: 'update', role:AUTH_ROLES.admin
            })

            .when('/cooperative/statistic', {
                templateUrl: Config.STATIC + 'modules/statistic/views/statistic.html',
                controller: 'StatisticCtrl', controllerAs: 'statistic', role:AUTH_ROLES.monitor
            })

            .when('/content/notification', {
                templateUrl: Config.STATIC + 'modules/notification/views/list.html',
                controller: 'NotificationListCtrl', controllerAs: 'notificationList', role:AUTH_ROLES.monitor
            })

            .when('/content/notification/new', {
                templateUrl: Config.STATIC + 'modules/notification/views/form.html',
                controller: 'NotificationFormCtrl', controllerAs: 'notification', role:AUTH_ROLES.editor,
                resolve: {
                    action: function(){return 'new';}
                }
            })

            .when('/content/notification/edit/:id', {
                templateUrl: Config.STATIC + 'modules/notification/views/form.html',
                controller: 'NotificationFormCtrl', controllerAs: 'notification', role:AUTH_ROLES.editor,
                resolve: {
                    action: function(){return 'edit';}
                }
            })

            //credit urls
            .when('/request/credit', {
                templateUrl: Config.STATIC + 'modules/credit/views/list.html',
                controller: 'CreditListCtrl', controllerAs: 'creditList', role:AUTH_ROLES.monitor
            })

            .when('/request/credit/view/:id', {
                templateUrl: Config.STATIC + 'modules/credit/views/view.html',
                controller: 'CreditViewCtrl', controllerAs: 'creditView', role:AUTH_ROLES.editor
            })

            //user urls
            .when('/request/user', {
                templateUrl: Config.STATIC + 'modules/user/views/list.html',
                controller: 'UserListCtrl', controllerAs: 'userList', role:AUTH_ROLES.monitor
            })

            .when('/request/user/view/:id/:type', {
                templateUrl: Config.STATIC + 'modules/user/views/view.html',
                controller: 'UserViewCtrl', controllerAs: 'userView', role:AUTH_ROLES.editor
            })

            .when('/login', {
				templateUrl: Config.STATIC + 'modules/auth/views/login.html',
			    controller: 'LoginCtrl', controllerAs: 'login', role:AUTH_ROLES.guest
            })

			.otherwise({redirectTo: '/'});
	}
])

.run(['$rootScope', '$location', 'AuthManager', 'AUTH_EVENTS', function($rootScope, $location, AuthManager, AUTH_EVENTS){

    // fix data transfer bug
    $.event.props.push('dataTransfer');

    // login success event
    $rootScope.$on(AUTH_EVENTS.loginSuccess, function(e, data){
        AuthManager.login(data.data.token);
    });

    // logout succes event
    $rootScope.$on(AUTH_EVENTS.logoutSuccess, function(){
        AuthManager.logout();
    });

    // not authenticasted event
    $rootScope.$on(AUTH_EVENTS.notAuthenticated, function(e){
        e.preventDefault();
        if($location.$$path != '/login'){ $location.url('/login/?next=' + $location.$$path); }
    });    

    $rootScope.$on('$routeChangeStart', function(event, current, prev){
        AuthManager.check(current, prev);
    });
}]);