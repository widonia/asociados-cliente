"use strict";

function PageListCtrl($rootScope, PageService){

    this.convertType = function(results){
        for(var result in results){
            results[result]['type'] = (results[result]['type'] == 1) ? 'categoria' : 'contenido';
        }
        return results;
    }
}

angular
    .module('app.page.controllers')
    .controller('PageListCtrl', PageListCtrl);
