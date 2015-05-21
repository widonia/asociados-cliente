"use strict";

function UpdateIndexCtrl(UpdateService, $upload, $http, Config){

    var self = '';
    this.show = {'files':false, 'send':false}
    this.success = false;
    this.files = {
        'DB_asociado.csv': false,
        'DB_familia_asociado.csv': false,
        'DB_balance.csv': false,
        'DB_credito.csv': false,
        'DB_obligacion.csv': false,
        'DB_obligacion_asociado.csv': false,
    }

    this.error = '';

    this.init = function(){
        self = this;
    }

    this.addFile = function(e){
        self.readFiles(e.dataTransfer.files);
    }

    this.readFiles = function(_files){
        this.show.files = true;
        for (var i = 0, f; f = _files[i]; i++) {
            if(this.files[f.name] != undefined){ 
                this.files[f.name] = f;
            }
        }

        this.checkFiles();
    }

    this.checkFiles = function(){
        var send = true;
        for(var f in this.files){
            if(this.files[f] == false){
                send = false; 
            }
        }
        this.show.send = send; 
    }

    this.sendFiles = function(){
        if(Object.keys(this.files).length == 6){

            //form data append files
            var fd = new FormData();
            var file;
            for( file in this.files){
                fd.append(file, this.files[file]);
            }

            //send file
            $http.post(Config.REST + '/api/update/', fd,
            {   
                transformRequest:angular.identity,
                headers:{'Content-Type':undefined}
            })
            .success(this.sendFilesOk.bind(this))
            .error(this.sendFilesError.bind(this));
        }else{
            this.sendFilesError();
        }
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
            this.files[response.file] = false;
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