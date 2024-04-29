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
    removeUser(user) {
        this.users = this.users.filter((user1) => user1.socket !== (user === null || user === void 0 ? void 0 : user.socket));
        this.users.forEach((u) => {
            this.debug(`Waiting ${u.userName} and current players ${this.users.length}`);
            u.socket.send(JSON.stringify({
                type: 'waiting',
                payload: {
                    waitMessage: `waiting for ${4 - this.users.length} more user to join...`
                }
            }));
        });
    }
    debug(message) {
        console.log(message);
    }
}
exports.Room = Room;
