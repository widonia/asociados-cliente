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

    this.init = function(){

        this.data = {
            "content": "",
            "parent": null,
            "position": "0",
            "title": "",
            "published": false,
            "description": "",
            "observation": "",
            "users":[]
        }

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
        this.data = response;
        
        // add actually users
        for (var i = this.data.users.length - 1; i >= 0; i--) {
            this.addUser(this.data.users_info[i]);
        };
        

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


    this.onGroups = function(response){
        this.groups = response.results;
        this.groups = response.data;
        console.log(response.data);
    }

    this.onGroupsErr = function(){
        console.log('On groups Err')
    }

    this.submit = function(){
        $rootScope.$broadcast('loading-show');
        this.data.content =  tinyMCE.activeEditor.getContent();
        this.form.submitted = true;
        if (this.form.$valid) {
            if(this.action == 'new'){; 
                console.log('new')
                console.log(this.data);
                NotificationService.post({}, this.data,
                    this.onSubmitOk.bind(this),
                    this.onSubmitError.bind(this)
                );
            }

            if(this.action == 'edit'){
                console.log('edit')
                console.log(this.data.users);
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

            $http.put(Config.REST + '/api/notification_client/'+response.id+'/add_image', fd,
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
        for(var user in this.groups[this.data.group].users){
            // console.log("iterando", user);
            console.log(this.groups[this.data.group].users[user])
            this.addUser(this.groups[this.data.group].users[user]);
        }
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
            console.log('if');
            console.log(user.id);
            this.autocomplete.list.push(user);            
            console.log(this.autocomplete);
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

    this.init();
}

angular
    .module('app.notification.controllers')
    .controller('NotificationFormCtrl', NotificationFormCtrl);