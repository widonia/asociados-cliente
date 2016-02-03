"use strict";

function TermsFillCtrl($scope, $rootScope,  $http, $routeParams, Config,  CooperativeService, AuthManager){
    this.data = {};
    this.form = false;
    this.cooperative = AuthManager.get('cooperative');

    this.init = function(){
        this.tinymceOptions = {
            plugins: [
                "advlist autolink autosave link lists textcolor paste textcolor"
            ],
            min_height: 400,
            toolbar1 : "bold italic underline, alignleft aligncenter alignright alignjustify, formatselect forecolor,link,unlink,bullist numlist,blockquote,undo", 
        };

        this.populate();  

    }

    this.populate = function(){        
        CooperativeService.get(
            {id:this.cooperative}, 
            this.onPopulate.bind(this), 
            this.onPopulateErr.bind(this)
        );
    }

    this.onPopulate = function(response){
        this.data.terms = response.terms;
    }

    this.onPopulateErr = function(response){
        // console.log(response);
    }

    this.submit = function(){
        // this.data.terms =  tinyMCE.activeEditor.getContent();
        var confirmEdit = confirm('¿Esta seguro de editar los términso y condiciones?');   
        if (confirmEdit) {
            this.form.submitted = true;
            if (this.data.terms == "" || this.data.terms == undefined || this.data.terms == null) {
                this.data.terms = null;
            }
            CooperativeService.set_terms({id:this.cooperative}, 
                this.data,
                this.onSubmitOk.bind(this),
                this.onSubmitError.bind(this)
            );
        }
        
    }

    this.onSubmitOk = function(response){
        this.form.success = true;
        this.data.terms = response.data.terms;
    }

    this.onSubmitError = function(response){
        this.form.success = false
    }

    this.init();
}

angular
    .module('app.terms.controllers')
    .controller('TermsFillCtrl', TermsFillCtrl);
