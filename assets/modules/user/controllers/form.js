"use strict";

function UserFormCtrl($scope, $rootScope, $routeParams, $q, UserService, action, SweetAlert, $http, Config){
    this.data = {};
    this.action = action;
    this.form = false;
    this.no_form_show = false;
    $scope.imageData = {};
    $scope.myImage='';
    $scope.myCroppedImage='';
    $scope.finalCropped = true;
    $scope.actionButtons = true;

    this.init = function(){
        if(this.action == 'edit'){
            this.populate();
        }
    }

    this.populate = function(){
        UserService.get({id:$routeParams.id}, this.onPopulate.bind(this));
    }

    this.onPopulate = function(response){
        this.data = response;
        this.getImageToReview(this.data);
    }

    this.submit = function(){
        this.form.submitted = true;
        if (this.form.$valid) {
            if(this.action == 'new'){
                UserService.save({}, this.data,
                    this.onSubmit.bind(this),
                    this.onSubmitErr.bind(this)
                );
            }

            if(this.action == 'edit'){
                UserService.put({id:$routeParams.id}, this.data,
                    this.onSubmit.bind(this),
                    this.onSubmitErr.bind(this)
                );
            }
        }
    }

    this.onSubmit = function(response){
        this.form.success = true;
        SweetAlert.swal("¡Realizado!", "Acción realizada correctamente.", "success");
        if (this.action == "new"){
            this.no_form_show = true;
        }else{
            this.no_form_show = false;
        }
    }

    this.onSubmitErr = function(response){
        this.form.success = false;
        SweetAlert.swal("Error!", "Lo sentimos, no se pudo completar la acción.", "error"); 
    }

    this.getImageToReview = function(data){
        this.userId = data.id;
        UserService.imageReview({pk:this.userId}, this.onImageReviewSuccess, this.onImageReviewErr);
    }

    this.onImageReviewSuccess = function(response){
        $scope.imageData = response.data;
        $scope.getTemporalImage(response.data.image_revision);
    }

    this.onImageReviewErr = function(response){
        $scope.notImage = "No hay imágen para aprobar";
        $scope.actionButtons = false;
    }

    $scope.getTemporalImage = function(image){
        // var theImage = 'https://s3-us-west-2.amazonaws.com/asociados.stage/' + image;
        // $scope.myImage = Config.REST+ '/' + image;
        console.log(image);
        // $scope.myImage = 'img/beta.jpg';
        $scope.myImage = 'https://s3-us-west-2.amazonaws.com/asociados.stage/' + image;
    }

    $scope.approve = function(userId){
        var user = $scope.imageData.auth_user;
        var image = document.getElementById("croppedImage");
        var blob = dataURItoBlob(image.src);
        var fd = new FormData();

        fd.append('file', blob);
        fd.append("user_id", userId);
        fd.append("accept", 1);

        $http.put(Config.REST + '/api/user/replace_image_revision/', fd,
        {   
            transformRequest:angular.identity,
            headers:{'Content-Type':undefined}
        })
        .success($scope.onApproveSuccess)
        .error($scope.onApproveErr);
    }

    $scope.onApproveSuccess = function(response){
        console.log(response);
        $scope.finalCropped = false;
        $scope.actionButtons = false;
        $scope.imageMessage = "Imagen aprobada!";
    }

    $scope.onApproveErr = function(response){
        console.log(response)
    }

    $scope.reject = function(userId){
        var fd = new FormData();

        fd.append('file', null);
        fd.append("user_id", userId);
        fd.append("accept", false);

        $http.put(Config.REST + '/api/user/replace_image_revision/', fd,
        {   
            transformRequest:angular.identity,
            headers:{'Content-Type':undefined}
        })
        .success($scope.onRejectSuccess)
        .error($scope.onRejectErr);

        // UserService.rejectImage(fd, $scope.onRejectSuccess, $scope.onRejectErr);
    }

    $scope.onRejectSuccess = function(response){
        console.log(response);
        $scope.finalCropped = false;
        $scope.actionButtons = false;
        $scope.imageMessage = "Imagen rechazada!";
    }

    $scope.onRejectErr = function(response){
        console.log(response);
        $scope.finalCropped = false;
        $scope.actionButtons = false;
        $scope.imageMessage = "Imagen rechazada!";
    }

    this.init();
}

angular
    .module('app.user.controllers')
    .controller('UserFormCtrl', UserFormCtrl);
