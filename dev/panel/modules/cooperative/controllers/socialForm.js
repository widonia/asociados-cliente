"use strict";

function SocialFormCtrl($routeParams, SocialService){
    this.data = {'facebook':'', 'twitter':''};
    this.form = false;

    this.init = function(){
        this.populate();
    }

    this.populate = function(){
        SocialService.get({},
            this.onPopulateOk.bind(this),
            this.onPopulateError.bind(this)
        );
    }

    this.submit = function(){
        this.form.submitted = true;
        SocialService.put({}, this.data,
            this.onSubmitOk.bind(this),
            this.onSubmitError.bind(this)
        );

    }

    this.onPopulateOk = function(response){
        var self = this;
        response.data.forEach(function(entry) {
            self.data[entry.type] = entry.page
        });
    }

    this.onPopulateError = function(response){

    }

    this.onSubmitOk = function(response){
        this.form.success = true;
    }

    this.onSubmitError = function(response){
        this.form.success = false;
    }

    this.init();
}

angular
    .module('app.cooperative.controllers')
    .controller('SocialFormCtrl', SocialFormCtrl);