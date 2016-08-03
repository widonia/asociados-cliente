"use strict";

function fixURL(url){
    var _url = url.replace(/\/?(\?|#|$)/, '/$1');
    return _url;
}

function addParameter(url, param){
    var _url = url;
    _url += (_url.split('?')[1] ? '&':'?') + param;
    return _url;
}

function convertImgToBase64(url, callback, outputFormat){
    var img = new Image();
    img.setAttribute('crossOrigin', 'anonymous');
    img.onload = function(){
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        canvas.height = this.height;
        canvas.width = this.width;
        ctx.drawImage(this,0,0);
        var dataURL = canvas.toDataURL(outputFormat || 'image/png');
        callback(dataURL);
        canvas = null; 
    };
    img.src = url;
}

//Create Blob object
function dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    var array = [];
    for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {
        type: mimeString
    });
}