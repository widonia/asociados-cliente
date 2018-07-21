// "use strict";

// function PageFormCtrl($rootScope, $routeParams, $q, $http,  PageService, action, SweetAlert){
//     $scope.lvl = [];
//     this.data = {
//         content: "",
//         parent: null,
//         position: "0",
//         title: null,
//         type: null,
//         published: true,
//         access_level: []
//     };

//     this.init = function(){
//         // Access level directive
//         $scope.accessLevel = {
//             public:false,
//             semiPublic: false,
//             private: false,
//         };

//         this.nodeData = null;
//         this.data_nodes = [];
//         this.status = {
//             is_form:false
//         };
//         this.tinymceOptions = {
//             plugins: [
//                 'advlist autolink lists link image charmap  preview hr anchor pagebreak',
//                 'searchreplace wordcount visualblocks visualchars code fullscreen',
//                 'insertdatetime media nonbreaking save table contextmenu ',
//                 'emoticons template paste textcolor colorpicker textpattern imagetools '
//             ],
//             theme: 'modern',
//             min_height: 500,            
//             toolbar1: "insertfile undo redo | styleselect | bold italic underline | forecolor backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link unlink image",
//             toolbar2 : "searchreplace  | table |  emoticons | ",            
//             spellchecker_language: 'es', 
//             content_css: [              
//                 // '../../../css/tinimyci.css'
//             ],
//             image_advtab: true,
//         }; 
//     }

//     this.init();
// }

// angular
//     .module('app.page.controllers')
//     .controller('PageFormCtrl', PageFormCtrl);
