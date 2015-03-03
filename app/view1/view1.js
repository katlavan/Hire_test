'use strict';

angular.module('myApp.view1', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])
    .controller('View1Ctrl',['$scope', 'dataService', function($scope, dataService) {
        $scope.data = dataService.dataObj;

        $scope.players = {
            pl1: "",
            pl2: ""
        };
        $scope.startGame = function () {
            alert("game start!")
        };

    }]);