import { WebSocketServer } from 'ws';
// import http from 'http';
// import express from 'express';
import { GameManager } from './GameManager';
import { User } from './util/User';
import url from 'url';

// const port = 8000;
// const server = http.createServer(express)

const wss = new WebSocketServer({port:8000});

const gameManager = new GameManager()

wss.on('connection', function connection(ws, req) {
    //@ts-ignore
    const userName: string = url.parse(req.url, true).query.userName;
    console.log(`joined ${userName}`)
    //@ts-ignore
    gameManager.addUser(new User(ws, userName))

    ws.on('close', () =>{
        gameManager.removeUser(ws)
    })
});