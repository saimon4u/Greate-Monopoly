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
        if (this.users.length < 4) {
            this.users.forEach((u) => {
                u.socket.send(JSON.stringify({
                    type: 'waiting',
                    payload: {
                        waitMessage: `waiting for ${4 - this.users.length} more user to join...`
                    }
                }));
            });
        }
    }
}
exports.Room = Room;
