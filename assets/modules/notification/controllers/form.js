"use strict";

function NotificationFormCtrl($scope, $rootScope, $routeParams, $http, NotificationService, action, UserService, Config, GroupsService, SweetAlert){

    this.autocomplete = {'key':'', 'suggest':[], 'list':[]};
    this.data = {'public':true, 'users':[]};
    this.action = action;
    this.form = false;
    this.groups = {};
    $scope.image = false;
    this.MEDIA = Config.MEDIA;
    this.no_form_show = false;

    this.init = function(){

        if(this.action == 'edit'){ this.populate(); }
        
        this.tinymceOptions = {
            plugins: [
                "advlist autolink autosave link image lists textcolor paste textcolor"
            ],
            min_height: 500,
            toolbar1 : "bold italic underline, alignleft aligncenter alignright alignjustify, formatselect forecolor,link,unlink,bullist numlist,blockquote,undo,image", 
            // images_upload_url: '/camilomilo',
            // file_browser_callback: function(field_name, url, type, win) {
            //     // win.document.getElementById(field_name).value = 'my browser value';
            //     console.log("Hola que hace todo bien o que hace");
            // },
            // file_picker_callback: function(callback, value, meta) {
            //     // Provide file and text for the link dialog
            //     if (meta.filetype == 'file') {
            //       callback('mypage.html', {text: 'My text'});
            //     }

            //     // Provide image and alt text for the image dialog
            //     if (meta.filetype == 'image') {
            //       callback('myimage.jpg', {alt: 'My alt text'});
            //     }

            //     // Provide alternative source and posted for the media dialog
            //     if (meta.filetype == 'media') {
            //       callback('movie.mp4', {source2: 'alt.ogg', poster: 'image.jpg'});
            //     }
            // },
            // images_upload_base_path: '/some/basepath',
            // images_upload_credentials: true,
            // images_upload_handler: function (blobInfo, success, failure) {
            //     var xhr, formData;

            //     xhr = new XMLHttpRequest();
            //     xhr.withCredentials = false;
            //     xhr.open('POST', 'postAcceptor.php');

            //     xhr.onload = function() {
            //         var json;

            //         if (xhr.status != 200) {
            //             failure('HTTP Error: ' + xhr.status);
            //             return;
            //         }

            //         json = JSON.parse(xhr.responseText);

            //         if (!json || typeof json.location != 'string') {
            //             failure('Invalid JSON: ' + xhr.responseText);
            //             return;
            //         }

            //         success(json.location);
            //     };

            //     formData = new FormData();
            //     formData.append('file', blobInfo.blob(), blobInfo.filename());

            //     xhr.send(formData);
            // },
            // images_upload_url: 'postAcceptor.php'
        };
        GroupsService.get({}, this.onGroups.bind(this), this.onGroupsErr.bind(this));
        console.log('Init');
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
            this.data.image = this.data.image + ".150x150." + this.data.image.split(".").pop(-1)
        }
        console.log('onPopulateOk');
    }

    this.onPopulateError = function(response){
        $rootScope.$broadcast('loading-hide');
        console.log('onPopulateError');
    }


    this.onGroups = function(response){
        this.groups = response.data;
    }

    this.onGroupsErr = function(){
        console.log('On groups Err')
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
                console.log('new')
                NotificationService.post({}, this.data,
                    this.onSubmitOk.bind(this),
                    this.onSubmitError.bind(this)
                );
            }

            if(this.action == 'edit'){
                console.log('edit')
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
        this.form.success = false;
        $rootScope.$broadcast('loading-hide');
        SweetAlert.swal("Error!", "Lo sentimos, no se pudo completar la acción.", "error"); 
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
            this.addUser(this.groups[this.data.group].users[user]);
        }
    }

    this.addUser = function(user){
        var exists = false;
        for (var element in this.autocomplete.list){
            if(user.username == this.autocomplete.list[element]['username'] && user.username != undefined){
                exists = true;
            }
        }
        
        if (exists == false){
            this.autocomplete.list.push(user);            
            this.data.users.push( ((user.id == undefined) ? user.user_id : user.id) );
        }

        // console.log(this.data.users);
        
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