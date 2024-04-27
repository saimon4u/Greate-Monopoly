
import { randomUUID } from 'crypto';

export class User {
    public socket: WebSocket;
    public userId: string;
    public userName: string;
    public roomId: string = '';
  
    constructor(socket: WebSocket, userName: string) {
      this.socket = socket;
      this.userName = userName;
      this.userId = randomUUID();
    }

    public setRoomId(roomId: string) {
      this.roomId = roomId;
    }
  }
  