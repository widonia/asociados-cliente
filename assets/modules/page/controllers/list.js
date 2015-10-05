"use strict";

function PageListCtrl(PageService){

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
        PageService.get({page:this.page, paginate:1}, this.onGetList.bind(this));
    }

    this.onGetList = function(response){
        this.count = response.count;
        this.list = response.results;
        window.scrollTo(0, 0);
    }

    this.delete = function(page_id, event){
        event.preventDefault();
        var confirmDelete = confirm('Esta seguro de querer borrar este elemento?');

        if (confirmDelete) {
            PageService.delete({id:page_id}, this.onDelete.bind(this));
        }
    }

    this.onDelete = function(){
        this.getList();
    }

    this.init();
}

angular
    .module('app.page.controllers')
    .controller('PageListCtrl', PageListCtrl);
