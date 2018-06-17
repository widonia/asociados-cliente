function fieldType(){
    return function (input, type) {
        if(type == 'date'){
            return moment(input).format('YYYY-MM-DD hh:mm a');
        }

        if(type == 'bool'){
            return (input == true || input == 'true' || input == 1) ? 'si' : 'no';
        }

        if(type == 'currency'){
            return '$ ' + input.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
        }

        return input;
    };
}

function fieldValue(){
    return function (input, value) {
        var newValue = input;
        var parts = value.split(".");
        for(var part in parts){
            if(newValue[parts[part]]){
                newValue = newValue[parts[part]];
            }else{
                newValue = '';
            }
            
        }
        return newValue;
    };
}

function truncate() {
    return function (text, length, end) {
        if (isNaN(length))
            return text

        if (end === undefined)
            end = "...";

        if (text.length <= length || text.length - end.length <= length) {
            return text;
        }
        else {
            return String(text).substring(0, length-end.length) + end;
        }

    };
}



angular
    .module('app.common.filters')
    .filter('fieldType', fieldType)
    .filter('fieldValue', fieldValue)
    .filter('truncate', truncate);