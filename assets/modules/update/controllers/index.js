"use strict";

function UpdateIndexCtrl(UpdateService, $http, Config){

    var self = this;

    // server populate data
    this.data = {

        // array with db properties
        db:[ 
            {
                id: 1,
                name:'asociados',
            },

            {
                id: 2,
                name:'familiares',
            },

            {
                id: 3,
                name:'creditos',
            },

            {
                id: 4,
                name:'obligaciones',
            },

            {
                id: 5,
                name:'extractos',
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

    this.init = function(){

    }

    this.onDBSelect = function(db){
        this.current = db;
    }

    this.uploadFile = function(){
        var fd = new FormData();
        console.log(this.file);
        fd.append('file', this.file);
        fd.append('date', 'test');

        //send file
        $http.post(Config.REST + '/api/update/', fd,
        {   
            transformRequest:angular.identity,
            headers:{'Content-Type':undefined}
        })
        .success(this.onUploadFile.bind(this))
        .error(this.onUploadFileErr.bind(this));
    }

    this.onUploadFile = function(response){

    }

    this.onUploadFileErr = function(response){

    }

    this.downloadFile = function(){

    }

    // add file to send to the server
    this.addFile = function(e){
        self.file = e.dataTransfer.files[0];
    }


/*
    this.init = function(){
        self = this;
    }

    this.setType = function(type){
        this.clearFiles(this.type);
        this.type = type;
    }

    this.addFile = function(e){
        self.readFiles(e.dataTransfer.files);
    }

    this.clearFiles = function(){
        for(var f in this.files[this.type]){
            this.files[this.type][f] = false;
        }
    }

    this.readFiles = function(_files){
        this.show.files = true;
        for (var i = 0, f; f = _files[i]; i++) {
            if(this.files[this.type][f.name] != undefined){ 
                this.files[this.type][f.name] = f;
            }
        }

        this.checkFiles();
    }

    this.checkFiles = function(){
        var send = true;
        for(var f in this.files[this.type]){
            if(this.files[this.type][f] == false){
                send = false; 
            }
        }
        this.show.send = send; 
    }

    this.sendFiles = function(){

        if(this.type == 'simple'){

            if(Object.keys(this.files[this.type]).length != 2){
                this.sendFilesError();
                return false;            
            }
        }
        
        if(this.type == 'advanced'){
            if(Object.keys(this.files[this.type]).length != 5){
                this.sendFilesError();
                return false;            
            }
        }
        

        //form data append files
        var fd = new FormData();
        var file;
        for( file in this.files[this.type]){
            fd.append(file, this.files[this.type][file]);
        }

        fd.append('type', this.type);

        //send file
        $http.post(Config.REST + '/api/update/', fd,
        {   
            transformRequest:angular.identity,
            headers:{'Content-Type':undefined}
        })
        .success(this.sendFilesOk.bind(this))
        .error(this.sendFilesError.bind(this));
        
    }

    this.sendFilesOk = function(){
        this.success = true;
        this.error = false;
    }

    this.sendFilesError = function(response){
        this.error = true;
        this.success = false;
        if(response.file != undefined){ 
            this.error = response.msg;
            this.files[this.type][response.file] = false;
            this.checkFiles();
        }else{
            this.error = "Ha ocurrido un error inesperado, contacte a soporte@asociados.com"
        }
    }

    this.init();
    */
}

angular
    .module('app.update.controllers')
    .controller('UpdateIndexCtrl', UpdateIndexCtrl);
