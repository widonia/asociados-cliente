"use strict";

function SocialFormCtrl($scope, $rootScope, $routeParams, SocialService, action, SweetAlert){
    this.data = {
        "access_level": []
    };
    this.form = false;
    this.action = action;
    $scope.accessLevel = {
        public:false,
        semiPublic: false,
        private: false,
    };
    $scope.lvl = [];

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
        console.log(response);
        this.fillDirective(response.access_level || []);
        var self = this;
        this.data.type_selected = this.data.options.filter(function(v){ return v.value==response.type;})[0]
        this.data.url = response.data.url;
        this.data.name = response.data.name;
        this.data.access_level = response.data.access_level || [];

        $rootScope.$broadcast('loading-hide');
    }

    this.onPopulateError = function(response){
        $rootScope.$broadcast('loading-hide');
    }

    this.submit = function(){
        // $rootScope.$broadcast('loading-show');
        this.form.submitted = true;
        console.log("this.data.type_selected");
        console.log(this.data.type_selected);
        this.data.type = this.data.type_selected.value;
        $rootScope.$broadcast('loading-show');
        if(this.action == 'new'){            
            SocialService.post({}, this.data,
                this.onSubmitOk.bind(this),
                this.onSubmitError.bind(this)
            );
        }
        else if(this.action == 'edit'){
            // console.log("Cambia todo edit")
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
        console.log(response);
        if(response.data.errors.URL === "BadURL"){
            SweetAlert.swal("Ups!", "Esta no es una URL válida.", "error");
        }
        $rootScope.$broadcast('loading-hide');
        this.form.success = false;
    }

    this.fillDirective = function(levels){
        $scope.lvl = levels;
        if(levels.indexOf("1") > -1){
            $scope.accessLevel['private'] = true;
        }
        
        if(levels.indexOf("2") > -1){
            $scope.accessLevel['semiPublic'] = true;
        }
        
        if(levels.indexOf("3") > -1){
            $scope.accessLevel['public'] = true;
        }
    }

    this.init();
}

angular
    .module('app.cooperative.controllers')
    .controller('SocialFormCtrl', SocialFormCtrl);