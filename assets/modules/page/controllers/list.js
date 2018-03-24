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
    $scope.lvl = [];
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
        var lista = data[0].data;
        
        this.parents = lista.filter( function(obj) {
            if (obj.type == 1) {
                return true;
            } 
        });
        console.log("$scope.action");
        console.log(this.action);
        if(this.action == 'new'){
            document.getElementById("check_public").checked = false;
            document.getElementById("check_private").checked = false;
        }

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
    }
    

    this.newSubItem = function(scope){
        this.getList();
        $scope.lvl = [];
            this.data = {
            content: "",
            parent: null,
            position: "0",
            title: null,
            type: null,
            published: true,
            access_level: []
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
    }

    this.edit = function(scope, node){
        this.getList();
        var scope = scope;
        this.nodeData = scope.$modelValue;
        this.data = this.nodeData;
        this.data['access_level'] = [];
        this.status.is_form = true;
        this.action = "edit";
      
        PageService.get({id:this.data.id}, this.onSuccesGet.bind(this));
    }

    this.onSuccesGet = function(response){
        console.log("response");
        console.log(response);
        this.data = response;
        this.fillDirective(this.data['access_level'] || []);
    }     

    this.fillDirective = function(levels){
        $scope.lvl = levels;
        if(levels.indexOf("1") > -1){
            $scope.accessLevel['private'] = true;
        }
        
        if(levels.indexOf("2") > -1){
            $scope.accessLevel['semiPublic'] = true;
        }
        
        if(levels.indexOf("3") > -1){
            $scope.accessLevel['public'] = true;
        }
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
                  title: "Cancelado", 
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
    
    this.init();

    // No here
    this.convertType = function(results){
        for(var result in results){
            results[result]['type'] = (results[result]['type'] == 1) ? 'categoria' : 'contenido';
        }
        return results;
    }

    this.submit = function(){
        $rootScope.$broadcast('loading-show');
        this.data.content =  tinyMCE.activeEditor.getContent();
        this.form.submitted = true;
        var access_level = [];
        
        if (this.form.$valid) {
            this.data["access_level"] = this.data.access_level;
            if(this.action == 'new'){
                PageService.post({}, this.data,
                    this.onSubmit.bind(this),
                    this.onSubmitErr.bind(this)
                );
            }

            if(this.action == 'edit'){
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
