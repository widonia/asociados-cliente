"use strict";
angular.module('app.creditRequest.services', []);
angular.module('app.creditRequest.controllers', []);
angular.module('app.commmon.filters', []);

angular.module('app.creditRequest', [
    'app.creditRequest.services',
    'app.creditRequest.controllers',
    'app.commmon.filters'
]);