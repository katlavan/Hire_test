'use strict';

angular.module('myApp.game', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/game', {
            templateUrl: 'desk/desk.html',
            controller: 'GameCtrl'
        });
    }])

    .controller('GameCtrl', ['$scope', 'dataService', function ($scope, dataService) {
        var sc = $scope;
        sc.data = dataService.dataObj;

        function Player() {
            this.wins = 0;
            this.isPlaying = true;
            this.symbol = "";
        };

        sc.pl1 = new Player();
        sc.pl2 = new Player();
        sc.currentSymbol = "X";
        sc.currentPlayer = true;
        sc.pl1.symbol = "X";
        sc.pl2.symbol = "O";
        sc.pl2.isPlaying = false;
        sc.desk = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        sc.currentMove = function (clickEvent) {
            setCell(clickEvent);
            checkWin();
            chCurrentPl(sc.currentSymbol);
            if (sc.pl1.isPlaying) {
                sc.currentSymbol = sc.pl1.symbol;
                sc.currentPlayer = true;
            } else {
                sc.currentSymbol = sc.pl2.symbol
                sc.currentPlayer = false;
            }
            ;
        };
        sc.reset = function () {
            var table = document.querySelector('#desk'),
                rowse = table.rows;
            for (var i = 0; i < rowse.length; i++) {
                for (var j = 0; j < rowse[i].children.length; j++)
                    rowse[i].children[j].innerHTML = '';
            }
            ;
            sc.desk = [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ];
            sc.currentSymbol = "X";


        };
        function checkWin() {
            if (sc.desk[0][0] === sc.desk[0][1] && sc.desk[0][1] === sc.desk[0][2] && sc.desk[0][2] != '') {
                winAlarm();
            } else if (sc.desk[1][0] === sc.desk[1][1] && sc.desk[1][1] === sc.desk[1][2] && sc.desk[1][2] != '') {
                winAlarm();
            } else if (sc.desk[2][0] === sc.desk[2][1] && sc.desk[2][1] === sc.desk[2][2] && sc.desk[2][2] != '') {
                winAlarm();
            } else if (sc.desk[0][0] === sc.desk[1][0] && sc.desk[1][0] === sc.desk[2][0] && sc.desk[2][0] != '') {
                winAlarm();
            } else if (sc.desk[0][1] === sc.desk[1][1] && sc.desk[1][1] === sc.desk[2][1] && sc.desk[2][1] != '') {
                winAlarm();
            } else if (sc.desk[0][2] === sc.desk[1][2] && sc.desk[1][2] === sc.desk[2][2] && sc.desk[2][2] != '') {
                winAlarm();
            } else if (sc.desk[0][0] === sc.desk[1][1] && sc.desk[1][1] === sc.desk[2][2] && sc.desk[2][2] != '') {
                winAlarm();
            } else if (sc.desk[0][2] === sc.desk[1][1] && sc.desk[1][1] === sc.desk[2][0] && sc.desk[2][0] != '') {
                winAlarm();
            }
            ;
        };
        function winAlarm() {
            var winner;
            if (sc.pl1.isPlaying) {
                sc.pl1.wins += 1;
                winner = "Player X";
            } else {
                sc.pl2.wins += 1;
                winner = "Player 0";
            };
            alert(winner + " win!");
            sc.reset();
        }

        function chCurrentPl(crnSmb) {
            if (crnSmb == "X") {
                sc.pl1.isPlaying = false;
                sc.pl2.isPlaying = true;
            } else {
                sc.pl2.isPlaying = false;
                sc.pl1.isPlaying = true;
            }
        };


        function setCell(clickEvent) {
            var cell = clickEvent.target,
                id = cell.getAttribute('data-id'),
                row = cell.parentNode.getAttribute("data-id");
            sc.desk[row][id] = sc.currentSymbol;
            cell.innerHTML = sc.desk[row][id];

        };

    }]);