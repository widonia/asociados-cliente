"use strict";

function NotificationFormCtrl($scope, $rootScope, $routeParams, $http, NotificationService, action, UserService, Config, GroupsService){

    this.autocomplete = {'key':'', 'suggest':[], 'list':[]};
    this.data = {'public':true, 'users':[]};
    this.action = action;
    this.form = false;
    this.groups = {};
    $scope.image = false;
    this.MEDIA = Config.MEDIA;
    
    this.init = function(){

        if(this.action == 'edit'){ this.populate(); }
        
        this.tinymceOptions = {
            plugins: [
                "advlist autolink autosave link image lists textcolor paste textcolor"
            ],
            min_height: 500,
            toolbar1 : "bold italic underline,formatselect forecolor,link,unlink,bullist numlist,blockquote,undo,image", 
        };
        GroupsService.get({}, this.onGroups.bind(this), this.onGroupsErr.bind(this));
    }


    this.onPopulateOk = function(response){
        $rootScope.$broadcast('loading-hide');
        this.data = response;

        // Set image thumbnail if exist
        console.log(this.data.image)
        if (this.data.image != undefined  && this.data.image != ""){
            // $scope.image = this.data.image;
            this.data.image = this.data.image + ".150x150." + this.data.image.split(".").pop(-1)
        }
    }

    this.onPopulateError = function(response){
        $rootScope.$broadcast('loading-hide');
    }


    this.onGroups = function(response){
        this.groups = response.results;
    }

    this.onGroupsErr = function(){

    }

    this.populate = function(){
        $rootScope.$broadcast('loading-show');
        NotificationService.get({id:$routeParams.id},
            this.onPopulateOk.bind(this),
            this.onPopulateError.bind(this)
        );
    }

    this.submit = function(){
        $rootScope.$broadcast('loading-show');
        this.data.content =  tinyMCE.activeEditor.getContent();
        this.form.submitted = true;
        if (this.form.$valid) {
            if(this.action == 'new'){; 
                NotificationService.post({}, this.data,
                    this.onSubmitOk.bind(this),
                    this.onSubmitError.bind(this)
                );
            }

            if(this.action == 'edit'){
                NotificationService.put({id:$routeParams.id}, this.data,
                    this.onSubmitOk.bind(this),
                    this.onSubmitError.bind(this)
                );
            }
        }
    }

    this.onChange = function(e){
        UserService.suggest({suggest:this.autocomplete.key},
            this.onSuggestOk.bind(this),
            this.onSuggestError.bind(this)
        );
    }

    this.onSuggestOk = function(response){
        this.autocomplete.suggest = response.data;   
    }

    this.onSuggestError = function(response){

    }


    this.onSubmitOk = function(response){
        if($scope.image != false){
            var fd = new FormData();

            fd.append('file', $scope.image);

            $http.put(Config.REST + '/api/notification_client/'+response.id+'/add_image', fd,
            {   
                transformRequest:angular.identity,
                headers:{'Content-Type':undefined}
            })
            .success(this.onImageOk.bind(this))
            .error(this.onImageError.bind(this));  
        }else{
            this.form.success = true;
        }
        $rootScope.$broadcast('loading-hide');
    }

    this.onSubmitError = function(response){
        this.form.success = false;
        $rootScope.$broadcast('loading-hide');
    }


    this.onImageOk = function(response){    
        this.form.success = true;
    }

    this.onImageError = function(response){
        this.form.success = false;
    }

    this.addUserByGroup = function(){            
        for(var user in this.groups[this.data.group].users){
            console.log("iterando", user);
            this.addUser(this.groups[this.data.group].users[user]);
        }
    }

    this.addUser = function(user){
        var exists = false;
        for (var element in this.autocomplete.list){
            if(user.username == this.autocomplete.list[element]['username']){
                exists = true;
            }
        }
        
        if (exists == false){
            this.autocomplete.list.push(user);            
            this.data.users.push( ((user.id == undefined) ? user.user_id : user.id) );
        }

        this.autocomplete.key = '';
        this.autocomplete.suggest = {};
    }

    this.removeUser = function(username){
        for (var user in this.autocomplete.list){
            if(username == this.autocomplete.list[user]['username']){
                this.autocomplete.list.splice(user, 1);
                this.data.users.splice(user, 1);
                break;
            }
        }
    }

    this.init();
}

angular
    .module('app.notification.controllers')
    .controller('NotificationFormCtrl', NotificationFormCtrl);