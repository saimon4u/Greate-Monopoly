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
}