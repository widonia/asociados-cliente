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
                name:'asociados',
                method: 'user_data',
            },

            {
                name:'creditos',
                method: 'credit',
            },

            {
                name:'obligaciones',
                method: 'obligation',
            },

            {
                name:'extractos',
                method: 'statement',
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
        this.getList();
    };

    this.getList = function(){
        UpdateService.info({}, this.onGetList.bind(this));
    }

    this.onGetList = function(response){
        this.info = response;

        for(var element in this.data.db){
            for(var element2 in  this.info){
                if(this.info[element2].file){
                    if(this.data.db[element].name == this.info[element2].file.name){
                        this.data.db[element].update = this.info[element2].update;
                    }
                }
            }
        }

        console.log(this.data);
    }

    this.onDBSelect = function(db){
        this.current = db;
        this.success = false;
        this.error = false;
        this.file = null;
    }

    this.uploadFile = function(){
        this.error = false;
        this.loading = true;
        var fd = new FormData();
        fd.append('file', this.file);
        fd.append('court_date', this.data.date);
        fd.append('delimiter', this.data.delimiter);

        //send file
        $http.post(Config.REST + '/api/update/load/'+this.current.method+ '/', fd,
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

    // add file to send to the server
    this.addFile = function(e){
        self.file = e.dataTransfer.files[0];
    }

    this.init();
}

angular
    .module('app.update.controllers')
    .controller('UpdateIndexCtrl', UpdateIndexCtrl);
