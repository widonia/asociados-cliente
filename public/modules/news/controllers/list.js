"use strict";

function NewsListCtrl(NewsService){
    
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
        NewsService.get({page:this.page}, this.onGetList.bind(this));   
    }

    this.onGetList = function(response){
        this.count = response.data.count;
        this.list = response.data.results;
        window.scrollTo(0, 0);
    }

    this.delete = function(page_id){
        event.preventDefault();   
        var confirmDelete = confirm('Esta seguro de querer borrar este elemento?');   

        if (confirmDelete) {
            NewsService.delete({id:page_id}, this.onDelete.bind(this));
        }
    }

    this.onDelete = function(){
        this.getList();
    }

    this.init();
}

angular
    .module('app.news.controllers')
    .controller('NewsListCtrl', NewsListCtrl);