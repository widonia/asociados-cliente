"use strict";function fixURL(e){var t=e.replace(/\/?(\?|#|$)/,"/$1");return t}function addParameter(e,t){var o=e;return o+=(o.split("?")[1]?"&":"?")+t}angular.module("app",["ngRoute","ui.bootstrap","ngResource","angularFileUpload","ui.tinymce","app.auth","app.page","app.news","app.document","app.update","app.credit","app.user","app.notification","app.common","app.cooperative","app.statistic"]).config(["$routeProvider","$httpProvider","$locationProvider","$sceDelegateProvider","AUTH_ROLES","Config",function(e,t,o,r,l,i){delete t.defaults.headers.common["X-Requested-With"],r.resourceUrlWhitelist(["self","http://s3-us-west-2.amazonaws.com/**"]),t.interceptors.push("AuthInterceptor"),e.when("/",{templateUrl:i.STATIC+"modules/home/views/home.html",controller:"HomeCtrl",controllerAs:"home",role:l.monitor}).when("/content/news",{templateUrl:i.STATIC+"modules/news/views/list.html",controller:"NewsListCtrl",controllerAs:"newsList",role:l.monitor}).when("/content/news/new",{templateUrl:i.STATIC+"modules/news/views/form.html",controller:"NewsFormCtrl",controllerAs:"news",role:l.editor,resolve:{action:function(){return"new"}}}).when("/content/news/edit/:id",{templateUrl:i.STATIC+"modules/news/views/form.html",controller:"NewsFormCtrl",controllerAs:"news",role:l.editor,resolve:{action:function(){return"edit"}}}).when("/content/page",{templateUrl:i.STATIC+"modules/page/views/list.html",controller:"PageListCtrl",controllerAs:"pageList",role:l.monitor}).when("/content/page/new",{templateUrl:i.STATIC+"modules/page/views/form.html",controller:"PageFormCtrl",controllerAs:"page",role:l.editor,resolve:{action:function(){return"new"}}}).when("/content/page/edit/:id",{templateUrl:i.STATIC+"modules/page/views/form.html",controller:"PageFormCtrl",controllerAs:"page",role:l.editor,resolve:{action:function(){return"edit"}}}).when("/cooperative/email",{templateUrl:i.STATIC+"modules/cooperative/views/email.html",controller:"EmailListCtrl",controllerAs:"emailList",role:l.admin}).when("/cooperative/email/new",{templateUrl:i.STATIC+"modules/cooperative/views/email-form.html",controller:"EmailFormCtrl",controllerAs:"email",role:l.editor,resolve:{action:function(){return"new"}}}).when("/cooperative/email/edit/:id",{templateUrl:i.STATIC+"modules/cooperative/views/email-form.html",controller:"EmailFormCtrl",controllerAs:"email",role:l.editor,resolve:{action:function(){return"edit"}}}).when("/cooperative/social",{templateUrl:i.STATIC+"modules/cooperative/views/social-form.html",controller:"SocialFormCtrl",controllerAs:"social",role:l.editor}).when("/cooperative/update",{templateUrl:i.STATIC+"modules/update/views/index.html",controller:"UpdateIndexCtrl",controllerAs:"update",role:l.admin}).when("/cooperative/statistic",{templateUrl:i.STATIC+"modules/statistic/views/statistic.html",controller:"StatisticCtrl",controllerAs:"statistic",role:l.monitor}).when("/content/notification",{templateUrl:i.STATIC+"modules/notification/views/list.html",controller:"NotificationListCtrl",controllerAs:"notificationList",role:l.monitor}).when("/content/notification/new",{templateUrl:i.STATIC+"modules/notification/views/form.html",controller:"NotificationFormCtrl",controllerAs:"notification",role:l.editor,resolve:{action:function(){return"new"}}}).when("/content/notification/edit/:id",{templateUrl:i.STATIC+"modules/notification/views/form.html",controller:"NotificationFormCtrl",controllerAs:"notification",role:l.editor,resolve:{action:function(){return"edit"}}}).when("/request/credit",{templateUrl:i.STATIC+"modules/credit/views/list.html",controller:"CreditListCtrl",controllerAs:"creditList",role:l.monitor}).when("/request/credit/view/:id",{templateUrl:i.STATIC+"modules/credit/views/view.html",controller:"CreditViewCtrl",controllerAs:"creditView",role:l.editor}).when("/request/user",{templateUrl:i.STATIC+"modules/user/views/list.html",controller:"UserListCtrl",controllerAs:"userList",role:l.monitor}).when("/request/user/view/:id/:type",{templateUrl:i.STATIC+"modules/user/views/view.html",controller:"UserViewCtrl",controllerAs:"userView",role:l.editor}).when("/login",{templateUrl:i.STATIC+"modules/auth/views/login.html",controller:"LoginCtrl",controllerAs:"login",role:l.guest}).otherwise({redirectTo:"/"})}]).run(["$rootScope","$location","AuthManager","AUTH_EVENTS",function(e,t,o,r){$.event.props.push("dataTransfer"),e.$on(r.loginSuccess,function(e,t){o.login(t.data.token)}),e.$on(r.logoutSuccess,function(){o.logout()}),e.$on(r.notAuthenticated,function(e){e.preventDefault(),"/login"!=t.$$path&&t.url("/login/?next="+t.$$path)}),e.$on("$routeChangeStart",function(e,t,r){o.check(t,r)})}]);