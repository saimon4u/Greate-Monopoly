// import { WebSocket } from 'ws';

// import {
//   GAME_OVER,
//   INIT_GAME,
//   JOIN_GAME,
//   MOVE,
//   OPPONENT_DISCONNECTED,
//   JOIN_ROOM,
//   GAME_JOINED,
//   GAME_NOT_FOUND,
//   GAME_ALERT,
//   GAME_ADDED,
// } from './messages';
// import { Game, isPromoting } from './Game';
// import { db } from './db';
// import { SocketManager, User } from './SocketManager';
// import { Square } from 'chess.js';

import { Game } from './util/Game';
import { Room } from './util/Room';
import { User } from './util/User'
import { randomUUID } from 'crypto';
import WebSocket from 'ws'


export class GameManager {
    private games: Game[];
  //   private pendingGameId: string | null;
  private users: User[];
  private pendingUser: User[];
  private rooms: Room[];

  constructor() {
    this.games = [];
    // this.pendingGameId = null;
    this.users = [];
    this.pendingUser = [];
    this.rooms = [];
  }

  addUser(user: User) {
    this.debug(`Added ${user.userName}`)
    this.users.push(user);
    this.addHandler(user);
    // if(this.pendingUser.length < 3) this.pendingUser.push(user);
  }

  removeUser(socket: WebSocket) {
    const user = this.users.find((user) => user.socket !== socket);
    if (!user) {
      console.error('User not found?');
      return;
    }
    const currentUser = this.users.find((user) => user.socket === socket)
    this.debug(`Removed ${currentUser?.userName}`)
    this.users = this.users.filter((user) => user.socket !== socket);
    const room = this.rooms.find((room) => room.roomId === currentUser?.roomId)
    if(!room){
      console.log('Room not found!')
      return;
    };
    room.removeUser(currentUser ? currentUser : null)
  }

  // removeGame(gameId: string) {
  //   this.games = this.games.filter((g) => g.gameId !== gameId);
  // }

  private addHandler(user: User) {
    user.socket.on('message', (data) => {
      //@ts-ignore
      const message = JSON.parse(data);

      if (message.type === 'create-room') {
        let roomId = user.userName + this.rooms.length
        this.debug(`${user.userName} created ${roomId}`)
        let room = new Room(roomId)
        user.setRoomId(roomId)
        room.addUser(user)
        // console.log('room created')
        this.rooms.push(room)
        user.socket.send(
          JSON.stringify({
            type: 'room-created',
            payload: {
              roomId: roomId
            }
          })
        )
        user.socket.send(
          JSON.stringify({
            type: 'waiting',
            payload: {
              waitMessage: `waiting for 3 more user to join...`
            }
          })
        )
      } else if (message.type === 'join-room') {
        const roomId = message.payload.roomId
        const room = this.rooms.find(room => room.roomId === roomId);
        if (!room) {
          user.socket.send(
            JSON.stringify({
              type: 'room-not-found',
              payload: {
                roomId: roomId
              }
            })
          )
        }
        else {
          // user.socket.send(
          //   JSON.stringify({
          //     type: 'joined-room',
          //     payload: {
          //       roomId: roomId
          //     }
          //   })
          // )
          if (room.users.length < 3) {
            this.debug(`${user.userName} joined ${roomId}`)
            user.setRoomId(roomId)
            room.addUser(user)
            user.socket.send(
              JSON.stringify({
                type: 'joined-room',
                payload: {
                  roomId: roomId
                }
              })
            )
            room.users.forEach((u) => {
              this.debug(`Waiting ${u.userName} and current players ${room.users.length}`)
              u.socket.send(
                JSON.stringify({
                  type: 'waiting',
                  payload: {
                    waitMessage: `waiting for ${4 - room.users.length} more user to join...`
                  }
                })
              )
            })
          }else if(room.users.length == 3){
            this.debug(`${user.userName} joined ${roomId}`)
            user.setRoomId(roomId)
            room.addUser(user)
            user.socket.send(
              JSON.stringify({
                type: 'joined-room',
                payload: {
                  roomId: roomId
                }
              })
            )
            const game = new Game(room.users[0], room.users[1], room.users[2], room.users[3])
            this.games.push(game)
            room.users.forEach((u) => {
              u.socket.send(
                JSON.stringify({
                  type: 'game-started',
                  payload: {
                    gameId: game.gameId
                  }
                })
              )
            })
          }
          else if(room.users.length == 4){
            user.socket.send(
              JSON.stringify({
                type: 'room-full',
                payload: {
                  roomId: roomId
                }
              })
            )
          }
        }
      }else if(message.type === 'move'){
        const value = message.payload.value
        this.debug(`${user.userName} moved ${value} in ${user.roomId}`)
      }
    })
    // user.socket.on('message', async (data) => {
    //   const message = JSON.parse(data.toString());
    //   if (message.type === 'init_game') {
    //     if (this.pendingGameId) {
    //       const game = this.games.find((x) => x.gameId === this.pendingGameId);
    //       if (!game) {
    //         console.error('Pending game not found?');
    //         return;
    //       }
    //       if (user.userId === game.player1UserId) {
    //         SocketManager.getInstance().broadcast(
    //           game.gameId,
    //           JSON.stringify({
    //             type: GAME_ALERT,
    //             payload: {
    //               message: 'Trying to Connect with yourself?',
    //             },
    //           }),
    //         );
    //         return;
    //       }
    //       SocketManager.getInstance().addUser(user, game.gameId);
    //       await game?.updateSecondPlayer(user.userId);
    //       this.pendingGameId = null;
    //     } else {
    //       const game = new Game(user.userId, null);
    //       this.games.push(game);
    //       this.pendingGameId = game.gameId;
    //       SocketManager.getInstance().addUser(user, game.gameId);
    //       SocketManager.getInstance().broadcast(
    //         game.gameId,
    //         JSON.stringify({
    //           type: GAME_ADDED,
    //         }),
    //       );
    //     }
    //   }

    // if (message.type === MOVE) {
    //   const gameId = message.payload.gameId;
    //   const game = this.games.find((game) => game.gameId === gameId);
    //   if (game) {
    //     game.makeMove(user, message.payload.move);
    //     if (game.result)  {
    //       this.removeGame(game.gameId);
    //     }
    //   }
    // }

    // if (message.type === JOIN_ROOM) {
    //   const gameId = message.payload?.gameId;
    //   if (!gameId) {
    //     return;
    //   }

    //   let availableGame = this.games.find((game) => game.gameId === gameId);
    //   const gameFromDb = await db.game.findUnique({
    //     where: { id: gameId },
    //     include: {
    //       moves: {
    //         orderBy: {
    //           moveNumber: 'asc',
    //         },
    //       },
    //       blackPlayer: true,
    //       whitePlayer: true,
    //     },
    //   });

    //   if (!gameFromDb) {
    //     user.socket.send(
    //       JSON.stringify({
    //         type: GAME_NOT_FOUND,
    //       }),
    //     );
    //     return;
    //   }

    //   if (!availableGame) {
    //     const game = new Game(
    //       gameFromDb?.whitePlayerId!,
    //       gameFromDb?.blackPlayerId!,
    //       gameFromDb.id,
    //       gameFromDb.startAt
    //     );
    //     game.seedMoves(gameFromDb?.moves || [])
    //     this.games.push(game);
    //     availableGame = game;
    //   }

    //   console.log(availableGame.getPlayer1TimeConsumed());
    //   console.log(availableGame.getPlayer2TimeConsumed());

    //   user.socket.send(
    //     JSON.stringify({
    //       type: GAME_JOINED,
    //       payload: {
    //         gameId,
    //         moves: gameFromDb.moves,
    //         blackPlayer: {
    //           id: gameFromDb.blackPlayer.id,
    //           name: gameFromDb.blackPlayer.name,
    //         },
    //         whitePlayer: {
    //           id: gameFromDb.whitePlayer.id,
    //           name: gameFromDb.whitePlayer.name,
    //         },
    //         player1TimeConsumed: availableGame.getPlayer1TimeConsumed(),
    //         player2TimeConsumed: availableGame.getPlayer2TimeConsumed(),
    //       },
    //     }),
    //   );

    //   SocketManager.getInstance().addUser(user, gameId);
    // }
  };

  public debug(message: string){
    console.log(message)
  }
}