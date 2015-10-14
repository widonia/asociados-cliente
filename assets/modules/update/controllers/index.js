"use strict";

function UpdateIndexCtrl($rootScope, UpdateService, $http, Config){

    var self = this;

    this.error = false;
    this.success = false;
    this.loading = false;

    // server populate data
    this.data = {
        delimiter : ';',

        // array with db properties
        db:[ 
            {
                id: 1,
                name:'asociados',
                method: 'user_data',
            },

            {
                id: 2,
                name:'familiares',
                method: 'user_family',
            },

            {
                id: 3,
                name:'creditos',
                method: 'credit',
            },

            {
                id: 4,
                name:'obligaciones',
                method: 'obligation',
            },

            {
                id: 5,
                name:'extractos',
                method: 'statements',
            },
        ],
    };

    this.file = null;

    // show loader indicator
    this.show = {'files':false, 'send':false}

    // current file selected
    this.current = this.data.db[0];

    // current error
    this.error = '';

    // current status
    this.status = '';

    // status for modal type, 1 upload or 2 download
    this.modalType = 1;

    this.init = function(){

    }

    this.onDBSelect = function(db, type){
        this.current = db;
        this.modalType = type;
        this.success = false;
        this.error = false;
        this.file = null;
    }

    this.uploadFile = function(){
        this.error = false;
        this.loading = true;
        var fd = new FormData();
        fd.append('file', this.file);
        fd.append('date', this.data.date);
        fd.append('delimiter', this.data.delimiter);

        //send file
        $http.post(Config.REST + '/api/update/'+this.current.method+ '/', fd,
        {   
            transformRequest:angular.identity,
            headers:{'Content-Type':undefined}
        })
        .success(this.onUploadFile.bind(this))
        .error(this.onUploadFileErr.bind(this));
    }

    this.onUploadFile = function(response){
        this.success = true;
        this.loading = false;
        this.file = null;
    }

    this.onUploadFileErr = function(response){
        this.error = 'el archivo contiene errores que no permiten subirlo';
        this.loading = false;
    }

    this.downloadFile = function(){
        $('#data-modal').modal('hide')
    }

    // add file to send to the server
    this.addFile = function(e){
        self.file = e.dataTransfer.files[0];
    }
}

angular
    .module('app.update.controllers')
    .controller('UpdateIndexCtrl', UpdateIndexCtrl);
