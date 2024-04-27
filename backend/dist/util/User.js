"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const crypto_1 = require("crypto");
class User {
    constructor(socket, userName) {
        this.roomId = '';
        this.socket = socket;
        this.userName = userName;
        this.userId = (0, crypto_1.randomUUID)();
    }
    setRoomId(roomId) {
        this.roomId = roomId;
    }
}
exports.User = User;
