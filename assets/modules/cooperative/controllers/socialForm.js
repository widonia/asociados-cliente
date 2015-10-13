"use strict";

function SocialFormCtrl($rootScope, $routeParams, SocialService, action){
    this.data = {};
    this.form = false;
    this.action = action;

    this.init = function(){    
        this.getSocialCategories()
    }

    this.getSocialCategories = function(){
        $rootScope.$broadcast('loading-show');
        SocialService.options({}, this.onSocialCategoriesOk.bind(this))
    }

    this.onSocialCategoriesOk =  function(response){
        this.data.options = response.actions.POST.type.choices;           
        if(this.action == 'edit'){
            this.populate(); 
        }else{
            $rootScope.$broadcast('loading-hide');
        }
        
    }

    this.populate = function(){
        $rootScope.$broadcast('loading-show');
        SocialService.get({'id':$routeParams.id},
            this.onPopulateOk.bind(this),
            this.onPopulateError.bind(this)
        );
    }

    this.onPopulateOk = function(response){
        var self = this;
        this.data.type_selected = this.data.options.filter(function(v){ return v.value==response.type;})[0]
        this.data.page = response.page;
        this.data.name = response.name;
        $rootScope.$broadcast('loading-hide');
    }

    this.onPopulateError = function(response){
        $rootScope.$broadcast('loading-hide');
    }

    this.submit = function(){
        // $rootScope.$broadcast('loading-show');
        // this.form.submitted = true;
        this.data.type = this.data.type_selected.value;
        $rootScope.$broadcast('loading-show');
        if(this.action == 'new'){            
            console.log("Cambia todo new")
            SocialService.post({}, this.data,
                this.onSubmitOk.bind(this),
                this.onSubmitError.bind(this)
            );
        }
        else if(this.action == 'edit'){
            console.log("Cambia todo edit")
            SocialService.put({'id':$routeParams.id}, this.data,
                this.onSubmitOk.bind(this),
                this.onSubmitError.bind(this)
            );
        }

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