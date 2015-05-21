function bankType(){
    return function (item) {
        return (item == 'c') ? 'Corriente' : 'Ahorros';
    };
}

angular
    .module('app.user.filters')
    .filter('bankType', bankType)