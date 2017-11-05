"use strict";

function CreditFormCtrl($rootScope, $routeParams, $q, $http,  CreditService, action){
    this.data = {};
    this.action = action;
    this.form = false;
    this.hstore = [];
    this.test = {
        yo: "yo"
    }
    this.accessLevel = {
        private: false,
        semiPublic: false,
        public: false
    };
    
    this.init = function(){
        this.populate();
    }

    this.populate = function(){
        CreditService.get({id:$routeParams.id}, this.onPopulate.bind(this));
    }

    this.onPopulate = function(response){
        // console.log(response);
        $rootScope.$broadcast('loading-hide');
        this.data = response;
        
        if(response.access_level.indexOf("1") > -1){
            this.accessLevel.public = true;
        }
        
        if(response.access_level.indexOf("2") > -1){
            this.accessLevel.semiPublic = true;
        }
        
        if(response.access_level.indexOf("3") > -1){
            this.accessLevel.private = true;
        }
        console.log("this.accessLevel");
        console.log(this.accessLevel);
        if(this.action === "edit") this.parseHStore();
    }

    this.parseHStore = function(){
        for(var element in this.data.data){
            this.hstore.push({key:element, value:this.data.data[element]});
        }
    }
    console.log(this.hstore);

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
        var access_level = [];
        console.log("this.accessLevel");
        console.log(this.accessLevel);
        access_level = this.setAccessLevel(this.accessLevel);
        this.applyHStore();
        this.form.submitted = true;
        if (this.form.$valid) {
            if(this.action == 'new'){
                if(Object.keys(this.accessLevel).length > 0){
                    this.data["access_level"] = access_level;
                }
                CreditService.save({}, this.data,
                    this.onSubmit.bind(this),
                    this.onSubmitErr.bind(this)
                );
            }

            if(this.action == 'edit'){
                this.data["access_level"] = this.setAccessLevel(this.accessLevel);
                console.log(this.data);
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

    this.setAccessLevel = function(access){
        var access_level = [];
        if(access.private){
            access_level.push("1");
        }
        if(access.semiPublic){
            access_level.push("2");
        }
        if(access.public){
            access_level.push("3");
        }
        console.log("access");
        console.log(access);
        return access_level;
    }

    this.init();
}

angular
    .module('app.credit.controllers')
    .controller('CreditFormCtrl', CreditFormCtrl);
