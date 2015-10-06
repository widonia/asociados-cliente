"use strict";

angular.module('app', [

	// angular modules
	'ngRoute',
    'ui.bootstrap',
	'ngResource',
    'file-model',
    //'angularFileUpload',
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
    'app.groups',
])

.config(['$routeProvider', '$httpProvider',  '$locationProvider', '$sceDelegateProvider', 'AUTH_ROLES', 'Config',

	function($routeProvider, $httpProvider, $locationProvider, $sceDelegateProvider, AUTH_ROLES, Config){

        delete $httpProvider.defaults.headers.common['X-Requested-With'];

        $sceDelegateProvider.resourceUrlWhitelist([
            // Allow same origin resource loads.
            'self',
            // Allow loading from our assets domain.  Notice the difference between * and **.
            'https://s3-us-west-2.amazonaws.com/**',
			'http://127.0.0.1:4000',
        ]);

		//auth interceptor
		$httpProvider.interceptors.push('AuthInterceptor');

		$routeProvider

            .when('/', {
                templateUrl: Config.STATIC + '/modules/home/views/home.html',
                controller: 'HomeCtrl', controllerAs: 'home', role:AUTH_ROLES.monitor
            })

            //news urls
			.when('/content/news', {
                templateUrl: Config.STATIC + '/modules/news/views/list.html',
                controller: 'NewsListCtrl', controllerAs: 'newsList', role:AUTH_ROLES.monitor
			})

            .when('/content/news/new', {
                templateUrl: Config.STATIC + '/modules/news/views/form.html',
                controller: 'NewsFormCtrl', controllerAs: 'news', role:AUTH_ROLES.editor,
                resolve: {
                    action: function(){return 'new';}
                }
            })

            .when('/content/news/edit/:id', {
                templateUrl: Config.STATIC + '/modules/news/views/form.html',
                controller: 'NewsFormCtrl', controllerAs: 'news', role:AUTH_ROLES.editor,
                resolve: {
                    action: function(){return 'edit';}
                }
            })

            //page urls
			.when('/content/page', {
				templateUrl: Config.STATIC + '/modules/page/views/list.html',
                controller: 'PageListCtrl', controllerAs: 'pageList', role:AUTH_ROLES.monitor
			})

            .when('/content/page/new', {
                templateUrl: Config.STATIC + '/modules/page/views/form.html',
                controller: 'PageFormCtrl', controllerAs: 'page', role:AUTH_ROLES.editor,
                resolve: {
                    action: function(){return 'new';}
                }
            })

            .when('/content/page/edit/:id', {
                templateUrl: Config.STATIC + '/modules/page/views/form.html',
                controller: 'PageFormCtrl', controllerAs: 'page', role:AUTH_ROLES.editor,
                resolve: {
                    action: function(){return 'edit';}
                }
            })

            // cooperative groups
            .when('/cooperative/groups', {
                templateUrl: Config.STATIC + '/modules/groups/views/list.html',
                controller: 'GroupsListCtrl', controllerAs: 'groupList', role:AUTH_ROLES.admin
            })

            .when('/cooperative/groups/new', {
                templateUrl: Config.STATIC + '/modules/groups/views/form.html',
                controller: 'GroupsFormCtrl', controllerAs: 'group', role:AUTH_ROLES.admin,
                resolve: {
                    action: function(){return 'new';}
                }
            })

            .when('/cooperative/groups/edit/:id', {
                templateUrl: Config.STATIC + '/modules/groups/views/form.html',
                controller: 'GroupsFormCtrl', controllerAs: 'group', role:AUTH_ROLES.admin,
                resolve: {
                    action: function(){return 'edit';}
                }
            })

            .when('/cooperative/groups/fill/:id', {
                templateUrl: Config.STATIC + '/modules/groups/views/fill.html',
                controller: 'GroupsFillCtrl', controllerAs: 'groupFill', role:AUTH_ROLES.admin
            })

            // cooperative url
            .when('/cooperative/email', {
                templateUrl: Config.STATIC + '/modules/cooperative/views/email.html',
                controller: 'EmailListCtrl', controllerAs: 'emailList', role:AUTH_ROLES.admin
            })

            .when('/cooperative/email/new', {
                templateUrl: Config.STATIC + '/modules/cooperative/views/email-form.html',
                controller: 'EmailFormCtrl', controllerAs: 'email', role:AUTH_ROLES.editor,
                resolve: {
                    action: function(){return 'new';}
                }
            })

            .when('/cooperative/email/edit/:id', {
                templateUrl: Config.STATIC + '/modules/cooperative/views/email-form.html',
                controller: 'EmailFormCtrl', controllerAs: 'email', role:AUTH_ROLES.editor,
                resolve: {
                    action: function(){return 'edit';}
                }
            })

            .when('/cooperative/social', {
                templateUrl: Config.STATIC + '/modules/cooperative/views/social-form.html',
                controller: 'SocialFormCtrl', controllerAs: 'social', role:AUTH_ROLES.editor,
            })

            .when('/cooperative/update', {
                templateUrl: Config.STATIC + '/modules/update/views/index.html',
                controller: 'UpdateIndexCtrl', controllerAs: 'update', role:AUTH_ROLES.admin
            })

            .when('/cooperative/statistic', {
                templateUrl: Config.STATIC + '/modules/statistic/views/statistic.html',
                controller: 'StatisticCtrl', controllerAs: 'statistic', role:AUTH_ROLES.monitor
            })

            .when('/content/notification', {
                templateUrl: Config.STATIC + '/modules/notification/views/list.html',
                controller: 'NotificationListCtrl', controllerAs: 'notificationList', role:AUTH_ROLES.monitor
            })

            .when('/content/notification/new', {
                templateUrl: Config.STATIC + '/modules/notification/views/form.html',
                controller: 'NotificationFormCtrl', controllerAs: 'notification', role:AUTH_ROLES.editor,
                resolve: {
                    action: function(){return 'new';}
                }
            })

            .when('/content/notification/edit/:id', {
                templateUrl: Config.STATIC + '/modules/notification/views/form.html',
                controller: 'NotificationFormCtrl', controllerAs: 'notification', role:AUTH_ROLES.editor,
                resolve: {
                    action: function(){return 'edit';}
                }
            })

            //credit urls
            .when('/request/credit', {
                templateUrl: Config.STATIC + '/modules/credit/views/list.html',
                controller: 'CreditListCtrl', controllerAs: 'creditList', role:AUTH_ROLES.monitor
            })

            .when('/request/credit/view/:id', {
                templateUrl: Config.STATIC + '/modules/credit/views/view.html',
                controller: 'CreditViewCtrl', controllerAs: 'creditView', role:AUTH_ROLES.editor
            })

            //user urls
            .when('/request/user', {
                templateUrl: Config.STATIC + '/modules/user/views/list.html',
                controller: 'UserListCtrl', controllerAs: 'userList', role:AUTH_ROLES.monitor
            })

            .when('/request/user/view/:id/:type', {
                templateUrl: Config.STATIC + '/modules/user/views/view.html',
                controller: 'UserViewCtrl', controllerAs: 'userView', role:AUTH_ROLES.editor
            })

            .when('/login', {
				templateUrl: Config.STATIC + '/modules/auth/views/login.html',
			    controller: 'LoginCtrl', controllerAs: 'login', role:AUTH_ROLES.guest
            })


			.otherwise({redirectTo: '/'});
	}
])

.run(['$rootScope', '$location', 'AuthManager', 'AuthService', 'AUTH_EVENTS',
	function($rootScope, $location, AuthManager, AuthService, AUTH_EVENTS){

		// finish loading page
	    try {
	        loading_screen.finish();
	    } catch (e) {
	        console.log("Error on finnish Screen loading.")
	    }

		// Firs of all check if is authenticated
	    AuthService.check(
	        function success(response){
	            AuthManager.isLogin = true;
                AuthManager.username = response.data.username;
                AuthManager.last_login = response.data.last_login;
	        },
	        function onError(){
	            AuthManager.isLogin = false;
	            $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
	        }
	    );

		// fix data transfer bug
	    $.event.props.push('dataTransfer');

	    // login success event
	    $rootScope.$on(AUTH_EVENTS.loginSuccess, function(e, data){
			console.log("Succes login");
	        AuthManager.login(data.data.token);
	    });

	    // logout succes event
	    $rootScope.$on(AUTH_EVENTS.logoutSuccess, function(){
			console.log("Succes logout");
	        AuthManager.logout();
	    });

	    // not authenticasted event
	    $rootScope.$on(AUTH_EVENTS.notAuthenticated, function(e){
			console.log("No authenticated");
	        e.preventDefault();
			// AuthManager.logout();
	        if($location.$$path != '/login'){ $location.url('/login/?next=' + $location.$$path); }
	    });

		// not authenticasted event
	    $rootScope.$on(AUTH_EVENTS.notAuthorized, function(e){
			console.log("No authorized")
	        e.preventDefault();
			// AuthManager.logout();
	        // if($location.$$path != '/login'){ $location.url('/login/?next=' + $location.$$path); }
	    });

	    $rootScope.$on('$routeChangeStart', function(event, current, prev){
	        AuthManager.check(current, prev);
	    });

		// $rootScope.$on('$stateChangeStart',
		// 	function(event, toState, toParams, fromState, fromParams){
		// 		console.log("Entra");
		// 		if (toState.authenticate && !AuthManager.isLogin ){
		// 			event.preventDefault();
		// 			if(fromState.name !='login'){
		// 				console.log(AuthManager.isLogin);
		// 				$state.transitionTo('login');
		// 			}
		// 		}
		// 		//Seteamos las variables de errores
		// 		$rootScope.succes = {
		// 			'status': false,
		// 			'data': null
		// 		}
		//
		// 		$rootScope.error = {
		// 			'status': false,
		// 			'msg':null,
		// 			'data': null,
		// 			'hint':null
		// 		}
		// 	}
		// );
	}
]);
