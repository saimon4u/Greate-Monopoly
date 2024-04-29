import { User } from "./User";

export class Room{
    public roomId: string;
    public users: User[];

    constructor(roomId: string){
        this.roomId = roomId;
        this.users = [];
    }

    public addUser(user: User){
        this.users.push(user);
    }

    public removeUser(user: User|null) {
        this.users = this.users.filter((user1) => user1.socket !== user?.socket);
        this.users.forEach((u) => {
            this.debug(`Waiting ${u.userName} and current players ${this.users.length}`)
            u.socket.send(
              JSON.stringify({
                type: 'waiting',
                payload: {
                  waitMessage: `waiting for ${4 - this.users.length} more user to join...`
                }
              })
            )
        })
    }

    public debug(message: string){
        console.log(message)
    }
}