"use strict";

function CreditFormCtrl($scope, $rootScope, $routeParams, $q, $http,  CreditService, action){
    this.data = {};
    this.action = action;
    this.form = false;
    this.hstore = [];

    $scope.accessLevel = {
        private: false,
        semiPublic: false,
        public: false
    };

    $scope.lvl = [];
    
    this.init = function(){
        this.populate();
    }

    this.populate = function(){
        CreditService.get({id:$routeParams.id}, this.onPopulate.bind(this));
        CreditService.getAll({id:$routeParams.id}, this.onPopulateAll.bind(this));
    }

    this.onPopulate = function(response){
        console.log(response);
        $rootScope.$broadcast('loading-hide');
        this.data = response;
        
        this.fillDirective(response.access_level);
        
        if(this.action === "edit") this.parseHStore();
    }

    this.onPopulateAll = function(response){
        console.log(response.data);
        this.parents = response.data.filter(credit => credit.type == 1);
        console.log(this.parents);
    }

    this.parseHStore = function(){
        for(var element in this.data.data){
            this.hstore.push({key:element, value:this.data.data[element]});
        }
    }

    this.applyHStore = function(){
        this.data.data = {};
        for(var element in this.hstore){
            this.data.data[this.hstore[element].key] = this.hstore[element].value;
        }
    }

    this.addHStore = function(){
        this.hstore.push({});
    }

    this.removeHStore = function(index){
        index = this.hstore.indexOf(index);
        this.hstore.splice(index, 1);
    }

    this.submit = function(){
        this.applyHStore();
        this.form.submitted = true;
        if (this.form.$valid) {
            this.data["access_level"] = this.data.access_level;
            if(this.action == 'new'){                
                CreditService.save({}, this.data,
                    this.onSubmit.bind(this),
                    this.onSubmitErr.bind(this)
                );
            }

            if(this.action == 'edit'){
                CreditService.put({id:$routeParams.id}, this.data,
                    this.onSubmit.bind(this),
                    this.onSubmitErr.bind(this)
                );
            }
        }
    }

    this.onSubmit = function(response){
        this.form.success = true;
    }

    this.onSubmitErr = function(response){
        this.form.success = false;
    }

    this.changeHstore = function(a,b){
        // console.log(a,b);
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
    .module('app.credit.controllers')
    .controller('CreditFormCtrl', CreditFormCtrl);
