"use strict";

angular
    .module('app.auth.services')
    .constant('AUTH_ROLES', {
		super:    1,
		admin:    2,
		editor:   3,
        monitor:  4,
        usuario:  5,
		guest:    6,
	});