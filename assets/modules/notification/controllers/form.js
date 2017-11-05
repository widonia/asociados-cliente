"use strict";

function NotificationFormCtrl($scope, $rootScope, $routeParams, $http, NotificationService, action, UserService, Config, GroupsService, SweetAlert){

    this.autocomplete = {'key':'', 'suggest':[], 'list':[]};
    this.data = {
        'public':true,
        'users':[],
        content: ""
    };
    this.action = action;
    this.form = false;
    this.groups = {};
    $scope.image = false;
    this.MEDIA = Config.MEDIA;
    this.no_form_show = false;
    this.showTitleError = false;
    var titleTooLong;
    var self = this;

    this.init = function(){


        this.data = {
            "content": "",
            "parent": null,
            "position": "0",
            "title": "",
            "description": "",
            "observation": "",
            "users":[],
            "access_level": []
        };
        console.log('this.data.users');
        console.log(this.data.users);

        this.accessLevel = {
            private: false,
            semiPublic: false,
            public: false
        };

        if(this.action == 'edit'){ this.populate(); }        
        this.tinymceOptions = {
            plugins: [
                'advlist autolink lists link image charmap  preview hr anchor pagebreak',
                'searchreplace wordcount visualblocks visualchars code fullscreen',
                'insertdatetime media nonbreaking save table contextmenu ',
                'emoticons template paste textcolor colorpicker textpattern imagetools '
            ],
            theme: 'modern',
            min_height: 500,            
            toolbar1: "insertfile undo redo | styleselect | bold italic underline | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link unlink image",
            toolbar2 : "searchreplace  | table |  emoticons | ",            
            spellchecker_language: 'es', 
            content_css: [              
                // '../../../css/tinimyci.css'
            ],
            image_advtab: true,
        };
        GroupsService.get({}, this.onGroups.bind(this), this.onGroupsErr.bind(this));
    }

    this.populate = function(){
        $rootScope.$broadcast('loading-show');
        NotificationService.get({id:$routeParams.id},
            this.onPopulateOk.bind(this),
            this.onPopulateError.bind(this)
        );
    }

    this.onPopulateOk = function(response){
        $rootScope.$broadcast('loading-hide');
        console.log(response);
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
        
        // Get users
        this.getListUsers();
        

        // Set image thumbnail if exist
        if (this.data.image != undefined  && this.data.image != ""){
            // $scope.image = this.data.image;
            this.data.image = this.data.image
        }
    }

    this.onPopulateError = function(response){
        $rootScope.$broadcast('loading-hide');
        console.log('onPopulateError');
    }

    this.getListUsers = function(){
        NotificationService.users({id:$routeParams.id}, this.onGetListUsersOk, this.onGetListUsersError);
    }

    this.onGetListUsersOk = function(response){
        console.log(response);
        for (var i = response.data.length - 1; i >= 0; i--) {
            self.addUser(response.data[i]);
        };
    }

    this.onGetListUsersError = function(response){
        console.log(response);
    }

    this.onGroups = function(response){
        this.groups = response.results;
        this.groups = response.data;
        console.log(response.data);
    }

    this.onGroupsErr = function(){
        console.log('On groups Err')
    }

    this.submit = function(){
        var access_level = [];
        var theData = {};
        access_level = this.setAccessLevel(this.accessLevel);

        $rootScope.$broadcast('loading-show');
        this.data.content =  tinyMCE.activeEditor.getContent();
        this.form.submitted = true;
        if (this.form.$valid) {
            if(this.action == 'new'){; 
                if(Object.keys(this.accessLevel).length > 0){
                    this.data["access_level"] = access_level;
                }
                theData = this.data;
                NotificationService.post({}, theData,
                    this.onSubmitOk.bind(this),
                    this.onSubmitError.bind(this)
                );
            }

            if(this.action == 'edit'){
                this.data["access_level"] = this.setAccessLevel(this.accessLevel);
                NotificationService.put({id:$routeParams.id}, this.data,
                    this.onSubmitOk.bind(this),
                    this.onSubmitError.bind(this)
                );
            }
        }
    }

    this.suggest = function(){
        UserService.suggest({suggest:this.autocomplete.key},
            this.onSuggestOk.bind(this),
            this.onSuggestError.bind(this)
        );
    }

    this.onSuggestOk = function(response){
        console.log(response)
        this.autocomplete.suggest = response.data;   
    }

    this.onSuggestError = function(response){
        console.log(response);
    }


    this.onSubmitOk = function(response){
        console.log(response);
        if($scope.image != false){
            var fd = new FormData();

            fd.append('file', $scope.image);

            $http.put(Config.REST + '/notification/'+response.id+'/add_image', fd,
            {   
                transformRequest:angular.identity,
                headers:{'Content-Type':undefined}
            })
            .success(this.onImageOk.bind(this))
            .error(this.onImageError.bind(this));  
        }else{
            this.form.success = true;
            SweetAlert.swal("¡Realizado!", "Acción realizada correctamente.", "success");
        }
        $rootScope.$broadcast('loading-hide');
        if (this.action == "new"){
            this.no_form_show = true;
        }else{
            this.no_form_show = false;
        }
    }

    this.onSubmitError = function(response){
        console.log(response);
        this.form.success = false;
        $rootScope.$broadcast('loading-hide');
        SweetAlert.swal({
            title: "Error!",
            text: "Lo sentimos, no se pudo completar la acción.",
            type: "error",
            confirmButtonText: "OK",
            closeOnConfirm: true   
        },
        function(){
            $scope.showTitleError = true;
            return titleTooLong;
        });
        console.log(this.titleTooLong); 
        this.titleTooLong = response.data.title[0];
    }


    this.onImageOk = function(response){    
        this.form.success = true;
        SweetAlert.swal("¡Realizado!", "Acción realizada correctamente.", "success");
    }

    this.onImageError = function(response){
        this.form.success = false;
        SweetAlert.swal("Error!", "Lo sentimos, no se pudo completar la acción.", "error");        
    }

    this.addUserByGroup = function(){
        console.log(this.groups)
        console.log(this.groups[this.data.group]);
        
        var group = this.groups[this.data.group];
        GroupsService.groupId(group, this.onGroupIdSuccess, this.onGroupIdError);

        // for(var user in this.groups[this.data.group].users){
        //     console.log("iterando", user);
        //     console.log(this.groups[this.data.group].users[user])
        //     this.addUser(this.groups[this.data.group].users[user]);
        // }
    }

    this.onGroupIdSuccess = function(response){
        console.log(response);
        for(var i=0; i<response.data.length; i++){
            self.addUser(response.data[i]);
        }
    }

    this.onGroupIdError = function(response){
        console.log(response);
    }

    this.addUser = function(user){
        console.log(user);
        var exists = false;
        for (var element in this.autocomplete.list){            
            console.log(this.autocomplete.list[element]['username']);
            console.log(this.autocomplete.list[element]['username'])
            if(user.username == this.autocomplete.list[element]['username'] && user.username != undefined){
                exists = true;
                console.log('if for');
            }
        }
        
        if (exists == false){
            this.autocomplete.list.push(user);            
            this.data['users'] = [];
            if(user.id == undefined){
                if(this.data.users.indexOf(user.user_id)){
                    this.data.users.push(user.user_id);        
                }
            }else{
                if(this.data.users.indexOf(user.id)){
                    this.data.users.push(user.id);
                }
            }
            // this.data.users.push( ((user.id == undefined) ? user.user_id : user.id) );
            console.log(this.data.users);
        }

        // console.log(this.data.users);
        
        this.autocomplete.key = '';
        this.autocomplete.suggest = {};
    }

    this.removeUser = function(username){
        console.log(this.data.users);
        for (var user in this.autocomplete.list){
            if(username == this.autocomplete.list[user]['username']){
                this.autocomplete.list.splice(user, 1);
                this.data.users.splice(user, 1);
                // break;
            }
        }
        console.log(this.data.users);
    }

    this.setAccessLevel = function(access){
        console.log(access);
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
        return access_level;
    }

    this.init();
}

angular
    .module('app.notification.controllers')
    .controller('NotificationFormCtrl', NotificationFormCtrl);