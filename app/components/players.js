'use strict';
angular.module('playersView', [])
    .factory('players', [function () {

        function Player() {
            this.wins = 0;
            this.isPlaying = true;
            this.symbol = "";
        };

        var playersData = {
            pl1: new Player(),
            pl2: new Player(),
            currentSymbol: "X",
            currentPlayer: true,
            desk: [
                ['', '', ''],
                ['', '', ''],
                ['', '', '']
            ]
        };
        playersData.pl1.symbol = "X";
        playersData.pl2.symbol = "O";
        playersData.pl2.isPlaying = false;

        return {
            players: playersData
        };
    }
    ]);