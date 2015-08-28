"use strict";

function GroupsFormCtrl($routeParams, GroupsService, action){
    this.data = {};
    this.action = action;
    this.form = false;


    this.init = function(){
        if(this.action == 'edit'){ this.populate(); }  
    }

    this.populate = function(){
        GroupsService.get({id:$routeParams.id},
            this.onPopulate.bind(this),
            this.onPopulateErr.bind(this)
        );
    }

    this.onPopulate = function(response){
        this.data.name = response.name;
        //GroupsService.post(this.data, this.onCreate.bind(this), this.onCreateErr.bind(this));
    }

    this.onPopulateErr = function(response){
        console.log(response);
    }

    this.submit = function(){
        if (this.form.$valid) {
            if(this.action == 'new'){
                GroupsService.post(this.data, this.onSubmit.bind(this), this.onSubmitErr.bind(this));
            }else{
                GroupsService.patch({id:$routeParams.id}, this.data, this.onSubmit.bind(this), this.onSubmitErr.bind(this));
            }
        }
    }

    this.onSubmit = function(response){
        this.form.success = true;
        console.log(response);
    }

    this.onSubmitErr = function(response){
        this.form.success = false
        console.log(response);
    }

    // this.init = function(){
    //     // tinymce.init({selector: "textarea"});
    //     if(this.action == 'edit'){ this.populate(); }   
         
    //     this.tinymceOptions = {
    //         plugins: [
    //             "advlist autolink autosave link image lists textcolor paste textcolor"
    //         ],

    //         toolbar1 : "bold italic underline,formatselect forecolor,link,unlink,bullist numlist,blockquote,undo,image", 
    //     };
    // }

    // this.populate = function(){
    //     NewsService.get({id:$routeParams.id},
    //         this.onPopulateOk.bind(this),
    //         this.onPopulateError.bind(this)
    //     );
    // }

    // this.submit = function(){
    //     this.form.submitted = true;
    //     if (this.form.$valid) {
    //         if(this.action == 'new'){
    //             NewsService.post({}, this.data,
    //                 this.onSubmitOk.bind(this),
    //                 this.onSubmitError.bind(this)
    //             );
    //         }

    //         if(this.action == 'edit'){
    //             NewsService.put({id:$routeParams.id}, this.data,
    //                 this.onSubmitOk.bind(this),
    //                 this.onSubmitError.bind(this)
    //             );
    //         }
    //     }
    // }

    // this.onPopulateOk = function(response){
    //     this.data.title = response.data.title;
    //     this.data.content = response.data.content;
    // }

    // this.onPopulateError = function(response){

    // }

    // this.onSubmitOk = function(response){
    //     this.form.success = true;
    // }

    // this.onSubmitError = function(response){
    //     this.form.success = false;
    // }

    this.init();
}

angular
    .module('app.groups.controllers')
    .controller('GroupsFormCtrl', GroupsFormCtrl);
