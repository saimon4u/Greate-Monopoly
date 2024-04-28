import { User } from "./User";
import {randomUUID} from 'crypto'

export class Game{
    public gameId: string;
    public player1: User;
    public player2: User;
    public player3: User;
    public player4: User;
    public startTime: Date;
    public moves: number[];

    constructor(player1: User, player2: User, player3: User, player4: User) {
        this.gameId = randomUUID();
        this.player1 = player1;
        this.player2 = player2;
        this.player3 = player3;
        this.player4 = player4;
        this.startTime = new Date();
        this.moves = [];
    }
}