"use strict";

function listView(Config){

    return {
        restrict: 'E',
        scope: { 
            fields: '=', 
            filters: '=', 
            url: '@', 
            module: '@', 
            label: '@', 
            rest: '@',
            queryparams: '@'
        },
        templateUrl: Config.STATIC + '/modules/common/views/list.html',
        controllerAs: 'listView',
        controller: function($scope, $rootScope, $http, CRUDService){

            /* total elements */
            this.count = 0;

            /* current page */
            this.page = 1;

            /* Results list */
            this.list = [];

            /* Fields to show */
            this.fields = $scope.fields;

            /* Fields to show */
            this.searchFilters = $scope.filters;

            /* text to find  */
            this.searchText = '';

            /* rest module url */
            this.rest = $scope.rest;

            this.queryparams = $scope.queryparams;

            this.module = $scope.module;
            this.label = $scope.label;
            this.url = $scope.url;


            this.init = function(){
                this.getList();
            }

            this.setPage = function () {
                this.getList();
            };

            this.getList = function(){
                var request = Config.REST + '/api/' + this.rest + '/?page='+this.page + this.getQuery();
                if (this.queryparams != undefined){
                    request += '&'+this.queryparams;
                }                
                $http.get(request)
                .success(this.onGetList.bind(this))
                .error(this.onGetListErr.bind(this));
            }

            this.onGetList = function(response){
                this.count = response.count;
                this.list = response.results;
                window.scrollTo(0, 0);
            }

            this.onGetListErr = function(response){
                this.count = 0;
                this.list = [];
                window.scrollTo(0, 0);
            }

            this.delete = function(id){
                event.preventDefault();
                var confirmDelete = confirm('Esta seguro de querer borrar este elemento?');

                if (confirmDelete) {
                    CRUDService.delete({object:this.rest, id:id}, this.onDelete.bind(this));
                }
            }

            this.onDelete = function(){
                this.getList();
            }

            this.search = function(){
                this.getList();
            }

            this.clear = function(){
                this.searchText = '';
                this.getList();
            }

            this.getQuery = function(){
                var query = '';
                for(var field in this.searchFilters){
                    query += '&' + this.searchFilters[field] + '__icontains=' + encodeURIComponent(this.searchText);
                }

                return query;
            }

            this.init();
        }
    };

}

angular
    .module('app.common.directives')
    .directive('listView', listView);