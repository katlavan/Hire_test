'use strict';
angular.module('gameLogic', [])
    .factory('gameLogic', [function () {
        var gameData = {};
        gameData.moving = function (clickEvent, scope) {
            var sc = scope;
            if (clickEvent.target.innerHTML != '') return false;
            setCell(clickEvent, sc);
            checkWin(sc);
            chCurrentPl(sc.currentSymbol, sc);
            if (sc.pl1.isPlaying) {
                sc.currentSymbol = sc.pl1.symbol;
                sc.currentPlayer = true;
            } else {
                sc.currentSymbol = sc.pl2.symbol
                sc.currentPlayer = false;
            }
        };
        gameData.reset = function (sc) {
            var table = document.querySelector('#desk'),
                rowse = table.rows;
            for (var i = 0, lng = rowse.length; i < lng; i += 1) {
                for (var j = 0; j < lng; j += 1)
                    rowse[i].children[j].innerHTML = '';
            }
            sc.desk = [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ];
            sc.currentSymbol = "X";
        };
        function setCell(clickEvent, sc) {
            var cell = clickEvent.target,
                id = cell.getAttribute('data-id'),
                row = cell.parentNode.getAttribute("data-id");
            sc.desk[row][id] = sc.currentSymbol;
            cell.innerHTML = sc.desk[row][id];
        };
        function chCurrentPl(crnSmb, sc) {
            if (crnSmb == "X") {
                sc.pl1.isPlaying = false;
                sc.pl2.isPlaying = true;
            } else {
                sc.pl2.isPlaying = false;
                sc.pl1.isPlaying = true;
            }
            ;
        };
        function checkWin(scope) {
            var sc = scope;
            function noOne(string){
                return string !== '';
            };
            if (sc.desk[0][0] === sc.desk[0][1] && sc.desk[0][1] === sc.desk[0][2] && sc.desk[0][2] != '') {
                winAlarm(sc);
            } else if (sc.desk[1][0] === sc.desk[1][1] && sc.desk[1][1] === sc.desk[1][2] && sc.desk[1][2] != '') {
                winAlarm(sc);
            } else if (sc.desk[2][0] === sc.desk[2][1] && sc.desk[2][1] === sc.desk[2][2] && sc.desk[2][2] != '') {
                winAlarm(sc);
            } else if (sc.desk[0][0] === sc.desk[1][0] && sc.desk[1][0] === sc.desk[2][0] && sc.desk[2][0] != '') {
                winAlarm(sc);
            } else if (sc.desk[0][1] === sc.desk[1][1] && sc.desk[1][1] === sc.desk[2][1] && sc.desk[2][1] != '') {
                winAlarm(sc);
            } else if (sc.desk[0][2] === sc.desk[1][2] && sc.desk[1][2] === sc.desk[2][2] && sc.desk[2][2] != '') {
                winAlarm(sc);
            } else if (sc.desk[0][0] === sc.desk[1][1] && sc.desk[1][1] === sc.desk[2][2] && sc.desk[2][2] != '') {
                winAlarm(sc);
            } else if (sc.desk[0][2] === sc.desk[1][1] && sc.desk[1][1] === sc.desk[2][0] && sc.desk[2][0] != '') {
                winAlarm(sc);
            } else if (sc.desk[0].every(noOne) && sc.desk[1].every(noOne) && sc.desk[2].every(noOne)) {
                alert("Nobody win! - reset Desk");
            }
        };
        function winAlarm(sc) {
            var winner;
            if (sc.pl1.isPlaying) {
                sc.pl1.wins += 1;
                winner = "Player X";
            } else {
                sc.pl2.wins += 1;
                winner = "Player 0";
            }
            alert(winner + " win!");
            sc.reset();
        };

        return {
            data: gameData
        };
    }
    ])