"use strict";

function CreditListCtrl($scope, $rootScope, $routeParams, $q, $http,  CreditService, $location){

    this.parents = [];
    this.nodeData = null;
    this.data_nodes = [];
    this.status = {
      is_form:false
    };    
    
    this.data = {
        content: "",
        parent: null,
        position: "0",
        title: null,
        type: null,
        published: true,
        access_level: []
    };

    this.init = function(){
        // Access level directive
        $scope.accessLevel = {
            public:false,
            semiPublic: false,
            private: false,
        };

        this.nodeData = null;
        this.data_nodes = [];
        this.status = {
            is_form:false
        };
        this.getList();
    }

    this.getList = function(){
        var filter = {page_size:1000};
        var list = CreditService.getAll(filter);

        $q.all([
            list.$promise,
        ]).then(onGetList.bind(this));
    }

    var onGetList = function(data){
        var lista = data[0].data;
        
        //Get parents
        this.parents = lista.filter( function(obj) {
            if (obj.type == 1) {
                return true;
            } 
        });

        //Get childs
        var principales = lista.filter(function (v) {
            return v.parent == null;
        });
        //Sort array ascending
        principales =  principales.sort(function(a, b) { 
            return  a.position - b.position;
        });
        
        //recursive, get childres for a id
        var getChildrens = function(id){
            var hijos = lista.filter(function(v){
                return v.parent == id;
            });
    
            if (hijos.length > 0){
                for(var j=0; j<hijos.length;j++){
                    hijos[j].nodes = [];
                    hijos[j].nodes = getChildrens(hijos[j].id);
                }
            
                return hijos.sort(function(a, b) { 
                    return  a.position - b.position;
                });
            }else{
                return [];
            }
        }

        for(var i=0;i<principales.length;i++){
            principales[i].nodes = getChildrens(principales[i].id);
        }
        this.data_nodes = principales;
    }

    this.newSubItem = function(){
        $location.url('cooperative/credits/new');
    }

    this.edit = function(scope, node){        
        $location.url('cooperative/credits/edit/' + node);
    }

    this.onSuccesGet = function(){
        this.data = response;
    }


    this.init();
}

angular
    .module('app.credit.controllers')
    .controller('CreditListCtrl', CreditListCtrl);