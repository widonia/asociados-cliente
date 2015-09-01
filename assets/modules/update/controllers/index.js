"use strict";

function UpdateIndexCtrl(UpdateService, $http, Config){

    var self = '';
    this.type = 'simple';
    this.show = {'files':false, 'send':false}
    this.success = false;
    this.files = {  
        'advanced':{
            'DB_asociado.csv': false,
            'DB_familia_asociado.csv': false,
            'DB_credito.csv': false,
            'DB_extracto_asociado.csv': false,
            'DB_obligacion_asociado.csv': false,
        },
        'simple':{
            'DB_asociado.csv': false,
            'DB_credito.csv': false,
        }
    }

    this.error = '';

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
}

angular
    .module('app.update.controllers')
    .controller('UpdateIndexCtrl', UpdateIndexCtrl);