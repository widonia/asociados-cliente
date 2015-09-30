"use strict";

function PageFormCtrl($routeParams, $q, $http,  PageService, action){
    this.data = {};
    this.action = action;
    this.form = false;
    this.categories = [];
    
    this.init = function(){
        this.getCategories();
        this.populate();
        this.tinymceOptions = {
           //  // apply_source_formatting : true,
           //  // keep_styles: true,
           //  // valid_elements: "span",
           //  extended_valid_elements: "*[*]",
           //  // add_filter('tiny_mce_before_init', 'override_mce_options'),
            plugins: [
                "advlist autolink autosave link image lists textcolor paste media"
            ],
            theme: "modern",
            toolbar1 : "bold italic underline,formatselect forecolor,link,unlink,bullist numlist,blockquote,undo,image",
            min_height: 500
        };
    }

    this.getCategories = function(){
        PageService.get({type:1}, this.onGetCategories.bind(this));
    }

    this.onGetCategories = function(response){
        this.categories = response.results;
        if(this.action == 'edit'){
            this.populate();
        }
    }

    this.populate = function(){
        PageService.get({id:$routeParams.id}, this.onPopulate.bind(this));
    }

    this.onPopulate = function(response){
        this.data = response;
    }

    this.submit = function(){
        this.data.content =  tinyMCE.activeEditor.getContent();
        this.form.submitted = true;
        if (this.form.$valid) {
            if(this.action == 'new'){
                PageService.post({}, this.data,
                    this.onSubmit.bind(this),
                    this.onSubmitErr.bind(this)
                );
            }

            if(this.action == 'edit'){
                PageService.put({id:$routeParams.id}, this.data,
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

    this.init();
}

angular
    .module('app.page.controllers')
    .controller('PageFormCtrl', PageFormCtrl);
