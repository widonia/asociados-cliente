"use strict";

function NewsFormCtrl($routeParams, NewsService, action){
    this.data = {};
    this.action = action;
    this.form = false;

    this.tinymceOptions = {
        selector: "textarea",
        theme: "modern",
        plugins: [
            "advlist autolink lists link image charmap print preview hr anchor pagebreak",
            "searchreplace wordcount visualblocks visualchars code fullscreen",
            "insertdatetime media nonbreaking save table contextmenu directionality",
            "emoticons template paste textcolor"
        ],
        toolbar1: "insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
        templates: [
            {title: 'Test template 1', content: 'Test 1'},
            {title: 'Test template 2', content: 'Test 2'}
        ]
    };

    this.init = function(){
        // tinymce.init({selector: "textarea"});
        if(this.action == 'edit'){ this.populate(); }
    }

    this.populate = function(){
        NewsService.get({id:$routeParams.id},
            this.onPopulateOk.bind(this),
            this.onPopulateError.bind(this)
        );
    }

    this.submit = function(){
        this.form.submitted = true;
        if (this.form.$valid) {
            if(this.action == 'new'){
                NewsService.post({}, this.data,
                    this.onSubmitOk.bind(this),
                    this.onSubmitError.bind(this)
                );
            }

            if(this.action == 'edit'){
                NewsService.put({id:$routeParams.id}, this.data,
                    this.onSubmitOk.bind(this),
                    this.onSubmitError.bind(this)
                );
            }
        }
    }

    this.onPopulateOk = function(response){
        this.data.title = response.data.title;
        this.data.content = response.data.content;
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
    .module('app.news.controllers')
    .controller('NewsFormCtrl', NewsFormCtrl);