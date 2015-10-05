"use strict";

function SocialFormCtrl($rootScope, $routeParams, SocialService){
    this.data = {'facebook':'', 'twitter':''};
    this.form = false;

    this.init = function(){
        this.populate();
    }

    this.populate = function(){
        $rootScope.$broadcast('loading-show');
        SocialService.get({},
            this.onPopulateOk.bind(this),
            this.onPopulateError.bind(this)
        );
    }

    this.onPopulateOk = function(response){
        var self = this;
        $rootScope.$broadcast('loading-hide');
        response.data.forEach(function(entry) {
            self.data[entry.type] = entry.page
        });
    }

    this.onPopulateError = function(response){
        $rootScope.$broadcast('loading-hide');
    }

    this.submit = function(){
        $rootScope.$broadcast('loading-show');
        this.form.submitted = true;
        SocialService.put({}, this.data,
            this.onSubmitOk.bind(this),
            this.onSubmitError.bind(this)
        );

    }


    this.onSubmitOk = function(response){
        $rootScope.$broadcast('loading-hide');
        this.form.success = true;
    }

    this.onSubmitError = function(response){
        $rootScope.$broadcast('loading-hide');
        this.form.success = false;
    }

    this.init();
}

angular
    .module('app.cooperative.controllers')
    .controller('SocialFormCtrl', SocialFormCtrl);