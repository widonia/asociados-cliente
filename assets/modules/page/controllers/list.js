"use strict";

function PageListCtrl($rootScope, PageService,  $q, $scope, SweetAlert){

    this.parents = [];
    this.nodeData = null;
    this.data_nodes = [];
    this.status = {
      is_form:false
    };


    this.search = function (list) {
      return list.filter(function (v) {
          return v.parent == null;
      });
    }

    this.init = function(){
        this.data = {
            content: "",
            parent: null,
            position: "0",
            title: null,
            type: null,
            published: true
        };
        this.nodeData = null;
        this.data_nodes = [];
        this.status = {
            is_form:false
        };
      this.getList();    
      this.tinymceOptions = {
        plugins: [
            'advlist autolink lists link image charmap  preview hr anchor pagebreak',
            'searchreplace wordcount visualblocks visualchars code fullscreen',
            'insertdatetime media nonbreaking save table contextmenu ',
            'emoticons template paste textcolor colorpicker textpattern imagetools '
        ],
        theme: 'modern',
        min_height: 500,            
        toolbar1: "insertfile undo redo | styleselect | bold italic underline | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link unlink image",
        toolbar2 : "searchreplace  | table |  emoticons | ",            
        spellchecker_language: 'es', 
        content_css: [              
            // '../../../css/tinimyci.css'
        ],
        image_advtab: true,
    };  
    }
    this.getList = function(id){
        var filter = {page_size:1000};
        var list = PageService.get(filter);

        $q.all([
            list.$promise,
        ]).then(onGetList.bind(this));
    }

    var onGetList = function(data) {
        console.log(data);
        var lista = data[0].data;
        
        this.parents = lista.filter( function(obj) {
            if (obj.type == 1) {
                return true;
            } 
        });

        var principales = lista.filter(function (v) {
          return v.parent == null;
        });    
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
        console.log(principales)
    }
    

    this.newSubItem = function(scope){
      this.data = {
        content: "",
        parent: null,
        position: "0",
        title: null,
        type: null,
        published: true
      };
      if (scope != undefined){
        var scope = scope;  
        this.nodeData = scope.$modelValue;
        this.data.parent_node = this.node; 
        this.data.parent = this.nodeData.id;
        this.data.parentName = this.nodeData.title;
      }else{
        this.nodeData = null;
      }
      this.status.is_form = true;            
      this.action = "new";
      // console.log(id);
    }

    this.edit = function(scope, node){
      var scope = scope;
      this.nodeData = scope.$modelValue;      
      this.data = this.nodeData;
      this.status.is_form = true;
    //   this.data.parent = null;
    //   this.data.parentName = null;
      this.action = "edit";
      // console.log(id);

      // var onSuccesGet = function(response){
      //   // this.data = response;
      // }     
      // PageService.get({id:this.data.id}, onSuccesGet.bind(this));
    }


    this.removing = function(scope, id){         
      var scope = scope;
      event.preventDefault();
      var onDelete = function(response){        
        scope.remove();  
        SweetAlert.swal("¡Eliminado!", "Elemento eliminado correctamente.", "success");
      }

      var confirmation = function(isConfirm){ 
         if (isConfirm) {           
              PageService.delete({id:id}, onDelete.bind(this));              
          } else {
              SweetAlert.swal({
                  title: "Canecelado", 
                  text: "No se eliminó nada.", 
                  type: "error",
                  timer: 2000
              });
          }
      }

      
      SweetAlert.swal({
         title: "¿Está seguro?",
         text: "Se eliminará este elemento, ¿Esta seguro?",
         type: "warning",
         showCancelButton: true,
         confirmButtonColor: "#DD6B55",
         confirmButtonText: "Si, ¡quiero eliminarlo!",
         cancelButtonText: "Cancelar",
         closeOnConfirm: false,
         closeOnCancel: false 
      },                    
          confirmation.bind(this)
      );
    }
    // $scope.resolveLink = function(page){
    //     if(page.type == 1){
    //         $state.go('app.tabs.info', {id: page.id});
    //     }else{
    //         $state.go('app.tabs.page', {id: page.id});
    //     }
    // }
    this.init();

    // No here
    this.convertType = function(results){
        for(var result in results){
            results[result]['type'] = (results[result]['type'] == 1) ? 'categoria' : 'contenido';
        }
        return results;
    }




    /// forms     
    // this.form = false;
    
    // this.init = function(){
    //     this.getCategories();
    //     this.populate();
    //     this.tinymceOptions = {
    //         plugins: [
    //             "advlist autolink autosave link image lists textcolor paste media"
    //         ],
    //         theme: "modern",
    //         toolbar1 : "bold italic underline, alignleft aligncenter alignright alignjustify, formatselect forecolor,link,unlink,bullist numlist,blockquote,undo,image", 
    //         min_height: 500
    //     };
    // }

    // this.getCategories = function(){
    //     PageService.get({type:1}, this.onGetCategories.bind(this));
    // }

    // this.onGetCategories = function(response){
    //     this.categories = response.data;
    //     if(this.action == 'edit'){
    //         this.populate();
    //     }
    // }

    // this.populate = function(){
    //     $rootScope.$broadcast('loading-show');
    //     PageService.get({id:$routeParams.id}, this.onPopulate.bind(this));
    // }

    // this.onPopulate = function(response){
    //     $rootScope.$broadcast('loading-hide');
    //     this.data = response;
    // }

    this.submit = function(){
        $rootScope.$broadcast('loading-show');
        this.data.content =  tinyMCE.activeEditor.getContent();
        this.form.submitted = true;
        if (this.form.$valid) {
            if(this.action == 'new'){
                PageService.post({}, this.data,
                    this.onSubmit.bind(this),
                    this.onSubmitErr.bind(this)
                );
            }

            if(this.action == 'edit'){
                console.log(this.data.id)
                PageService.put({id:this.data.id}, this.data,
                    this.onSubmit.bind(this),
                    this.onSubmitErr.bind(this)
                );
            }
        }
    }

    this.onSubmit = function(response){
        $rootScope.$broadcast('loading-hide');
        SweetAlert.swal("¡Realizado!", "Acción realizada correctamente.", "success");        
        this.form.success = true;
        this.status.is_form=false;        
        if(this.action == 'new'){
          if (this.nodeData == null){
            this.data_nodes.push(response);  
          }else{
            this.nodeData.nodes.push(response);  
          }
        }else{
            this.init();
        }
    }

    this.onSubmitErr = function(response){
        $rootScope.$broadcast('loading-hide');
        this.form.success = false;
        SweetAlert.swal("Error!", "Lo sentimos, no se pudo completar la acción.", "error"); 
    }

    // this.init();
}

angular
    .module('app.page.controllers')
    .controller('PageListCtrl', PageListCtrl);
