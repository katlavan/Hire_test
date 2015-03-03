'use strict';

angular.module('appFilters', []).filter('checkplayer', function() {
    return function(input) {
        return input ? 'X' : 'O' ;
    };
});