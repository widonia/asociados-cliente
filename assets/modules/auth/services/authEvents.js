"use strict";

angular
    .module('app.auth.services')
    .constant('AUTH_EVENTS', {
        authSuccess: 'authSuccess',
		loginSuccess: 'loginSuccess',
		loginFailed: 'loginFailed',
        logoutSuccess: 'logoutSuccess',
		selectCooperative: 'selectCooperative',
		sessionTimeout: 'sessionTimeout',
		notAuthenticated: 'notAuthenticated',
		notAuthorized: 'notAuthorized'
	});