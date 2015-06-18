"use strict";

function NotificationFormCtrl($routeParams, NotificationService, action, UserService){

    this.autocomplete = {'key':'', 'suggest':[], 'list':[]};
    this.data = {'public':true, 'users':[]};
    this.action = action;
    this.form = false;


    // this.tinymceOptions = {
    //     selector: "textarea",
    //     theme: "modern",
    //     plugins: [
    //         "advlist autolink lists link image charmap print preview hr anchor pagebreak",
    //         "searchreplace wordcount visualblocks visualchars code fullscreen",
    //         "insertdatetime media nonbreaking save table contextmenu directionality",
    //         "emoticons template paste textcolor"
    //     ],
    //     toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
    //     templates: [
    //         {title: 'Test template 1', content: 'Test 1'},
    //         {title: 'Test template 2', content: 'Test 2'}
    //     ]
    // };
    
    this.init = function(){
        if(this.action == 'edit'){ this.populate(); }
        
        this.tinymceOptions = {
            plugins: [
                "advlist autolink autosave link image lists textcolor paste textcolor"
            ],

            toolbar1 : "bold italic underline,formatselect forecolor,link,unlink,bullist numlist,blockquote,undo,image", 
        };
    }

    this.populate = function(){
        NotificationService.get({id:$routeParams.id},
            this.onPopulateOk.bind(this),
            this.onPopulateError.bind(this)
        );
    }

    this.submit = function(){
        this.form.submitted = true;
        if (this.form.$valid) {
            if(this.action == 'new'){
                NotificationService.post({}, this.data,
                    this.onSubmitOk.bind(this),
                    this.onSubmitError.bind(this)
                );
            }

            // if(this.action == 'edit'){
            //     NotificationService.put({id:$routeParams.id}, this.data,
            //         this.onSubmitOk.bind(this),
            //         this.onSubmitError.bind(this)
            //     );
            // }
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

    this.addUser = function(user){
        var exists = false;
        for (var element in this.autocomplete.list){
            if(user.username == this.autocomplete.list[element]['username']){
                exists = true;
            }
        }
        
        if (exists == false){
            this.autocomplete.list.push(user);
            this.data.users.push(user.user_id);
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

    this.onPopulateOk = function(response){
        this.data.title = response.data.title;
        this.data.content = response.data.content;
        this.data.public = response.data.public;
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
    .module('app.notification.controllers')
    .controller('NotificationFormCtrl', NotificationFormCtrl);