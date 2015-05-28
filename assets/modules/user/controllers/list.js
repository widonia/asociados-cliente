"use strict";

function UserListCtrl(UserService){
    
    this.count = 0;
    this.page = 1;
    this.list = [];

    this.init = function(){
        this.getList();
    }

    this.setPage = function () {
        this.getList();
    };

    this.getList = function(){
        UserService.request({page:this.page}, this.onGetList.bind(this));   
    }

    this.onGetList = function(response){
        this.count = response.data.count;
        this.list = response.data.results;
        window.scrollTo(0, 0);
    }

    this.init();
}

angular
    .module('app.user.controllers')
    .controller('UserListCtrl', UserListCtrl);