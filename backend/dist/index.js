"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
// import http from 'http';
// import express from 'express';
const GameManager_1 = require("./GameManager");
const User_1 = require("./util/User");
const url_1 = __importDefault(require("url"));
// const port = 8000;
// const server = http.createServer(express)
const wss = new ws_1.WebSocketServer({ port: 8000 });
const gameManager = new GameManager_1.GameManager();
wss.on('connection', function connection(ws, req) {
    //@ts-ignore
    const userName = url_1.default.parse(req.url, true).query.userName;
    // console.log(`joined ${userName}`)
    //@ts-ignore
    gameManager.addUser(new User_1.User(ws, userName));
    ws.on('close', () => {
        gameManager.removeUser(ws);
    });
});
