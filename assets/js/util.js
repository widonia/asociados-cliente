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

// Convert an object to a csv
function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {
    //If JSONData is not an object then JSON.parse will parse the JSON string in an Object
    console.log(JSONData.length)
    var arrData = typeof JSONData != 'object' ? JSON.parse(JSONData) : JSONData;
    
    var CSV = '';    
    //Set Report title in first row or line
    
    CSV += ReportTitle + '\r\n\n';

    //This condition will generate the Label/Header
    if (ShowLabel) {
        var row = "";
        
        //This loop will extract the label from 1st index of on array
        for (var index in arrData[0]) {
            
            //Now convert each value to string and comma-seprated
            row += index + ',';
        }

        row = row.slice(0, -1);
        
        //append Label row with line break
        CSV += row + '\r\n';
    }
    
    //1st loop is to extract each row
    console.log(arrData)
    console.log(Object.keys( arrData ).length);
    for (var i = 0; i < Object.keys( arrData ).length; i++) {
        var row = "";
        console.log(arrData[i]);
        
        //2nd loop will extract each column and convert it in string comma-seprated
        for (var index in arrData[i]) {
            console.log(arrData[i])
            row += '"' + arrData[i][index] + '",';
            if(arrData[i][index] != '"' && arrData[i][index] != ' ', arrData[i][index] != ' '){
                 row += '"' + arrData[i][index] + '",';
            }
        }

        row.slice(0, row.length - 1);
        // console.log(row)
        
        //add a line break after each row
        CSV += row + '\r\n';
    }

    if (CSV == '') {        
        alert("Invalid data");
        return;
    }   
    
    //Generate a file name
    var fileName = "MyReport_";
    //this will remove the blank-spaces from the title and replace it with an underscore
    fileName += ReportTitle.replace(/ /g,"_");   
    
    //Initialize file format you want csv or xls
    var uri = 'data:text/csv;charset=utf-8,' + escape(CSV);
    
    // Now the little tricky part.
    // you can use either>> window.open(uri);
    // but this will not work in some browsers
    // or you will not get the correct file extension    
    
    //this trick will generate a temp <a /> tag
    var link = document.createElement("a");    
    link.href = uri;
    
    //set the visibility hidden so it will not effect on your web-layout
    link.style = "visibility:hidden";
    // link.download = fileName + ".csv";
    
    //this part will append the anchor tag and remove it after automatic click
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}