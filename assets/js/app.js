"use strict";

angular.module('app', [

	// angular modules
	'ngRoute',
    'ui.bootstrap',
	'ngResource',
    'file-model',
    'ui.tinymce',
    'oitozero.ngSweetAlert',
    'ui.tree',
    
	// app modules
	'app.auth',
	'app.page',
    'app.news',
    'app.document',
    'app.update',
    'app.credit',
    'app.creditRequest',
    'app.user',
    'app.notification',
    'app.common',
    'app.cooperative',
    'app.statistic',
    'app.groups',
    'app.tasks',
    'app.terms'
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

            //user urls
            .when('/cooperative/users', {
                templateUrl: Config.STATIC + '/modules/user/views/list.html',
                controller: 'UserListCtrl', controllerAs: 'userctrl', role:AUTH_ROLES.monitor,
                role:AUTH_ROLES.monitor
            })

            .when('/cooperative/users/new', {
                templateUrl: Config.STATIC + '/modules/user/views/form.html',
                controller: 'UserFormCtrl', controllerAs: 'user', role:AUTH_ROLES.editor,
                resolve: {
                    action: function(){return 'new';}
                }
            })

            .when('/cooperative/users/edit/:id', {
                templateUrl: Config.STATIC + '/modules/user/views/form.html',
                controller: 'UserFormCtrl', controllerAs: 'user', role:AUTH_ROLES.editor,
                resolve: {
                    action: function(){return 'edit';}
                }
            })

            //credit urls
            .when('/cooperative/credits', {
                templateUrl: Config.STATIC + '/modules/credit/views/list.html',
                role:AUTH_ROLES.monitor
            })

            .when('/cooperative/credits/new', {
                templateUrl: Config.STATIC + '/modules/credit/views/form.html',
                controller: 'CreditFormCtrl', controllerAs: 'credit', role:AUTH_ROLES.editor,
                resolve: {
                    action: function(){return 'new';}
                }
            })

            .when('/cooperative/credits/edit/:id', {
                templateUrl: Config.STATIC + '/modules/credit/views/form.html',
                controller: 'CreditFormCtrl', controllerAs: 'credit', role:AUTH_ROLES.editor,
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
                templateUrl: Config.STATIC + '/modules/cooperative/views/email-list.html',
                role:AUTH_ROLES.admin
                // controller: 'EmailListCtrl', controllerAs: 'emailList', role:AUTH_ROLES.admin
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

            // Social URL

            .when('/cooperative/social', {
                templateUrl: Config.STATIC + '/modules/cooperative/views/social-list.html',
                role:AUTH_ROLES.editor
                // controller: 'SocialListCtrl', controllerAs: 'social', role:AUTH_ROLES.editor,
            })

            .when('/cooperative/social/new', {
                templateUrl: Config.STATIC + '/modules/cooperative/views/social-form.html',
                controller: 'SocialFormCtrl', controllerAs: 'social', role:AUTH_ROLES.editor,
                resolve: {
                    action: function(){return 'new';}
                }
            })

            .when('/cooperative/social/edit/:id', {
                templateUrl: Config.STATIC + '/modules/cooperative/views/social-form.html',
                controller: 'SocialFormCtrl', controllerAs: 'social', role:AUTH_ROLES.editor,
                resolve: {                    
                    action: function(){return 'edit';}
                }
            })

            //Update
            .when('/cooperative/update', {
                templateUrl: Config.STATIC + '/modules/update/views/index.html',
                controller: 'UpdateIndexCtrl', controllerAs: 'update', role:AUTH_ROLES.admin
            })

            // .when('/cooperative/statistic', {
            //     templateUrl: Config.STATIC + '/modules/statistic/views/statistic.html',
            //     controller: 'StatisticCtrl', controllerAs: 'statistic', role:AUTH_ROLES.monitor
            // })

            .when('/content/notification', {
                templateUrl: Config.STATIC + '/modules/notification/views/list.html',
                role:AUTH_ROLES.monitor
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

            //credit request urls
            .when('/request/credit', {
                templateUrl: Config.STATIC + '/modules/creditRequest/views/list.html',
                controller: 'CreditRequestListCtrl', controllerAs: 'creditList', role:AUTH_ROLES.monitor
            })

            .when('/request/credit/edit/:id', {
                templateUrl: Config.STATIC + '/modules/creditRequest/views/view.html',
                controller: 'CreditRequestViewCtrl', controllerAs: 'creditView', role:AUTH_ROLES.editor
            })

            //Terms urls
            .when('/cooperative/terms', {
                templateUrl: Config.STATIC + '/modules/terms&conditions/views/fill.html',
                controller: 'TermsFillCtrl', controllerAs: 'ctrl', role:AUTH_ROLES.editor,
                resolve: {                    
                    action: function(){return 'edit';}
                }
            })

            //user urls
            // .when('/request/user', {
            //     templateUrl: Config.STATIC + '/modules/user/views/list.html',
            //     controller: 'UserListCtrl', controllerAs: 'userList', role:AUTH_ROLES.monitor
            // })

            // .when('/request/user/view/:id/:type', {
            //     templateUrl: Config.STATIC + '/modules/user/views/view.html',
            //     controller: 'UserViewCtrl', controllerAs: 'userView', role:AUTH_ROLES.editor
            // })

            .when('/login', {
				templateUrl: Config.STATIC + '/modules/auth/views/login.html',
			    controller: 'LoginCtrl', controllerAs: 'login', role:AUTH_ROLES.guest
            })


            // Tasks
            .when('/tasks/status', {
                templateUrl: Config.STATIC + '/modules/tasks/views/list.html',
                controller: 'TaskController', controllerAs: 'taskList', role:AUTH_ROLES.monitor
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

                $rootScope.user = {};
                $rootScope.user.username = AuthManager.username.charAt(0).toUpperCase() +  AuthManager.username.substr(1).toLowerCase();
                
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
            // document.body.style.background = "transparent";
            AuthManager.login(data.token);
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


        $rootScope.$on("ERROR", function(e){
            e.preventDefault();
        });
	}
]);
