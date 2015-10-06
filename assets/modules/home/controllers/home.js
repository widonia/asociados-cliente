"use strict";

function HomeCtrl(AuthManager){
    this.username = AuthManager.username;
    this.last_login = AuthManager.last_login;
}

angular
    .module('app.home.controllers')
    .controller('HomeCtrl', HomeCtrl)
