"use strict";

function listView(Config){

    return {
        restrict: 'E',
        scope: { fields: '=', url: '@', module: '@', label: '@'},
        templateUrl: Config.STATIC + '/modules/common/views/list.html',
        controllerAs: 'listView',
        controller: function($scope, $rootScope, $http, CRUDService){


            this.count = 0;
            this.page = 1;
            this.list = [];
            this.fields = $scope.fields;
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
                $rootScope.$broadcast('loading-show');

                //send file
                $http.get(Config.REST + '/api/' + this.url + '/?page='+this.page)
                .success(this.onGetList.bind(this));
                // .error(this.onUploadFileErr.bind(this));


                // CRUDService.get({object:this.url, page:this.page}, this.onGetList.bind(this));
            }

            this.onGetList = function(response){
                $rootScope.$broadcast('loading-hide');

                this.count = response.count;
                this.list = response.results;
                window.scrollTo(0, 0);
            }

            this.delete = function(id){
                event.preventDefault();
                var confirmDelete = confirm('Esta seguro de querer borrar este elemento?');

                if (confirmDelete) {
                    $rootScope.$broadcast('loading-show');
                    CRUDService.delete({object:this.url, id:id}, this.onDelete.bind(this));
                }
            }

            this.onDelete = function(){
                this.getList();
            }

            this.init();
        }
    };

}

angular
    .module('app.common.directives')
    .directive('listView', listView);