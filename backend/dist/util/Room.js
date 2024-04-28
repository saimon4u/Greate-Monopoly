"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Room = void 0;
class Room {
    constructor(roomId) {
        this.roomId = roomId;
        this.users = [];
    }
    addUser(user) {
        this.users.push(user);
    }
}
exports.Room = Room;
