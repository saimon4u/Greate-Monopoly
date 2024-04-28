"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
const crypto_1 = require("crypto");
class Game {
    constructor(player1, player2, player3, player4) {
        this.gameId = (0, crypto_1.randomUUID)();
        this.player1 = player1;
        this.player2 = player2;
        this.player3 = player3;
        this.player4 = player4;
        this.startTime = new Date();
        this.moves = [];
    }
}
exports.Game = Game;
