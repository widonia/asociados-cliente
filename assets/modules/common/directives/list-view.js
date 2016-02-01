"use strict";

function listView(Config){

    return {
        restrict: 'E',
        scope: { 
            fields: '=', 
            filters: '=', 
            actions: '=',
            url: '@', 
            label: '@', 
            rest: '@',
            queryParams: '@',
            callback: '&',
            defaultOrder: '@'
        },

        templateUrl: Config.STATIC + '/modules/common/views/list.html',
        controllerAs: 'listView',
        controller: function($scope, $rootScope, $http, $location, CRUDService){

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

            /* new, edit, delete and download */
            this.actions = {};

            /* rest module url */
            this.rest = $scope.rest;

            this.queryParams = $scope.queryParams;

            this.url = $location.$$path;

            this.callback = $scope.callback;

            /* orders */
            this.order = {}
            this.order.predicate = $scope.defaultOrder;
            this.order.reverse = false;
            this.order.status = null;

            /* Show search box*/
            if ($scope.showSearchBox == undefined){
                this.showSearchBox = true;
            }else{
                this.showSearchBox = $scope.showSearchBox;
            };

            this.init = function(){
                this.getList();
                this.initActions();
            }

            this.initActions = function(){
                for(var action in $scope.actions){
                    this.actions[$scope.actions[action]] = true;
                }
            }

            this.setPage = function () {
                this.getList();
            };

            this.getList = function(query){
                if (query == undefined){
                    query = this.getQuery();
                }

                var request = Config.REST + '/api/' + this.rest + '/?page='+this.page + query;             
                $http.get(request)
                    .success(this.onGetList.bind(this))
                    .error(this.onGetListErr.bind(this));
            }

            this.onGetList = function(response){
                this.count = response.count;

                // apply callback to make specific modifications to the result list
                this.list = (this.callback()) ? this.callback()(response.data) : response.data;
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

                // add filters
                for(var field in this.searchFilters){
                    if (this.searchFilters[field] == 'search'){
                        query += '&' + this.searchFilters[field] + '=' + encodeURIComponent(this.searchText);    
                    }else{
                        query += '&' + this.searchFilters[field] + '__icontains=' + encodeURIComponent(this.searchText);
                    }
                    
                }

                // add query params
                if (this.queryParams != undefined){
                    query += '&'+this.queryParams;
                }   

                // ordering
                var order_direction = ""
                if (this.order.reverse){
                    order_direction = "-"
                }                
                if (this.order.status != null){
                    query += "&ordering="+order_direction+this.order.predicate;                    
                }

                return query;
            }

            this.order_column = function(string){
                this.order.reverse = (this.order.predicate === string) ? !this.order.reverse : false;        
                this.order.predicate = string;
                this.order.status = true;
                this.getList();
            }

            this.init();
        }
    };

}

angular
    .module('app.common.directives')
    .directive('listView', listView);