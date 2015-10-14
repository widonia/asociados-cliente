function fieldType(){
    return function (input, type) {
        if(type == 'date'){
            return moment(input).format('YYYY-MM-DD hh:mm a');
        }

        if(type == 'bool'){
            return (input == true || input == 'true' || input == 1) ? 'si' : 'no';
        }

        return input;
    };
}

angular
    .module('app.common.filters')
    .filter('fieldType', fieldType)