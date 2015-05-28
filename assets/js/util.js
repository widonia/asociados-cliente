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
