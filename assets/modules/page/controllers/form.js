"use strict";

function PageFormCtrl($rootScope, $routeParams, $q, $http,  PageService, action, SweetAlert){
    this.data = {};
    this.action = action;
    this.form = false;
    this.categories = [];
    
    this.init = function(){
        this.getCategories();
        this.populate();
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
    }

    this.getCategories = function(){
        PageService.get({type:1}, this.onGetCategories.bind(this));
    }

    this.onGetCategories = function(response){
        this.categories = response.data;
        if(this.action == 'edit'){
            this.populate();
        }
    }

    this.populate = function(){
        $rootScope.$broadcast('loading-show');
        PageService.get({id:$routeParams.id}, this.onPopulate.bind(this));
    }

    this.onPopulate = function(response){
        $rootScope.$broadcast('loading-hide');
        this.data = response;
    }

    this.submit = function(){
        $rootScope.$broadcast('loading-show');
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
        $rootScope.$broadcast('loading-hide');
        SweetAlert.swal("¡Realizado!", "Acción realizada correctamente.", "success");
        this.form.success = true;
    }

    this.onSubmitErr = function(response){
        $rootScope.$broadcast('loading-hide');
        this.form.success = false;
        SweetAlert.swal("Error!", "Lo sentimos, no se pudo completar la acción.", "error"); 
    }

    this.init();
}

angular
    .module('app.page.controllers')
    .controller('PageFormCtrl', PageFormCtrl);
