'use strict';

angular.module('myApp.game', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/game', {
            templateUrl: 'desk/desk.html',
            controller: 'GameCtrl'
        });
    }])
    .filter('checkplayer', [function () {
        return function (input) {
            return input ? "X" : "O";
        };
    }])

    .controller('GameCtrl', ['$scope', 'gameLogic', 'players', function ($scope, gameLogic, players) {
        var sc = $scope;
        sc.plNames = players;
        sc.pl1 = players.players.pl1;
        sc.pl2 = players.players.pl2;
        sc.desk = players.players.desk;
        sc.currentSymbol = players.players.currentSymbol;
        sc.currentPlayer = players.players.currentPlayer;
        sc.moving = function (clickEvent) {
            gameLogic.data.moving(clickEvent, sc);
        };
        sc.reset = function () {
            gameLogic.data.reset(sc);
        };
    }]);