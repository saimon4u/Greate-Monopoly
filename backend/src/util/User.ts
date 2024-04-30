
import { randomUUID } from 'crypto';
import WebSocket from 'ws'

export class User {
    public socket: WebSocket;
    public userId: string;
    public userName: string;
    public roomId: string = '';
    public currentPosition: number = 0;
  
    constructor(socket: WebSocket, userName: string) {
      this.socket = socket;
      this.userName = userName;
      this.userId = randomUUID();
    }

    public setRoomId(roomId: string) {
      this.roomId = roomId;
    }

    public setCurrentPosition(position: number) {
      this.currentPosition = position;
    }
  }
  