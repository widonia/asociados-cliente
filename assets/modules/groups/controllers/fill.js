"use strict";

function GroupsFillCtrl($scope, $rootScope,  $http, $routeParams, Config, GroupsService){
    this.data = {};
    this.form = false;
    $scope.file = '';

    this.init = function(){
        this.populate();  
    }

    this.populate = function(){
        $rootScope.$broadcast('loading-show');
        GroupsService.get({id:$routeParams.id},
            this.onPopulate.bind(this),
            this.onPopulateErr.bind(this)
        );
    }

    this.onPopulate = function(response){
        $rootScope.$broadcast('loading-hide');
        this.data.users = response.users;
    }

    this.onPopulateErr = function(response){
        $rootScope.$broadcast('loading-hide');
        // console.log(response);
    }

    this.submit = function(){
        $rootScope.$broadcast('loading-show');
        var fd = new FormData();
        fd.append('file', $scope.file);

        //send file
        $http.post(Config.REST + '/api/group/' + $routeParams.id + '/fill_users/', fd,
        {   
            transformRequest:angular.identity,
            headers:{'Content-Type':undefined}
        })
        .success(this.onSubmit.bind(this))
        .error(this.onSubmitErr.bind(this));;
    }

    this.onSubmit = function(response){
        $rootScope.$broadcast('loading-hide');
        this.form.success = true;
    }

    this.onSubmitErr = function(response){
        $rootScope.$broadcast('loading-hide');
        this.form.success = false
    }

    this.init();
}

angular
    .module('app.groups.controllers')
    .controller('GroupsFillCtrl', GroupsFillCtrl);
