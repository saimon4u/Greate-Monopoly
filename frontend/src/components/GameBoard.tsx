import React, { useState, useEffect } from "react";
import { GameSquare } from "./GameSquare";
import One from '../assets/dice/one.png'
import Two from '../assets/dice/two.png'
import Three from '../assets/dice/three.png'
import Four from '../assets/dice/four.png'
import Five from '../assets/dice/five.png'
import Six from '../assets/dice/six.png'
import dice from '../assets/dice.gif'
import Player from '../assets/player.png'
import { useLocation } from "react-router-dom";
import { useSocket } from "../hooks/useSocket";
import { User } from '../../../backend/src/util/User'


export default function GameBoard() {
  const num_squares: Array<number> = Array.from(Array(40));
  const [rolling, setRolling] = useState(false)
  const [currentDice, setCurrentDice] = useState<number>(0)
  const [position, setPosition] = useState({ x: (.035 * window.innerWidth), y: (.04 * window.innerHeight) });
  const dices: Array<string> = [One, Two, Three, Four, Five, Six]
  let players: User[] = []





  const location = useLocation()
  const socket = useSocket(location.state.userName)
  const [joined, setJoined] = useState(false);
  const [started, setStarted] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [inputRoomId, setInputRoomId] = useState('');
  const [errors, setErrors] = useState('');
  const [place, setPlace] = useState<number>(0)

  //@ts-ignore
  const handleChange = (e) => {
    setErrors('')
    setInputRoomId(e.target.value);
  };

  //@ts-ignore
  const handleSubmit = (event) => {
    event.preventDefault();
    socket?.send(
      JSON.stringify({
        type: 'join-room',
        payload: {
          roomId: inputRoomId,
        }
      })
    )
  };

  const handleClick = () => {
    setRolling(true)
    const index = Math.floor(Math.random() * dices.length)
    setTimeout(() => {
      setRolling(false)
      setCurrentDice(index)
      setPlace(place + index)
    setPosition({ x: ((0.08 * window.innerWidth) + ((place) * 0.07 * window.innerWidth) /*+ (0.5 * 0.07 * window.innerWidth)*/), y: (0.09 * window.innerHeight) })
    }, 1000)
    console.log(`dice: ${currentDice} and place: ${place} and index: ${index}`)
    socket?.send(
      JSON.stringify({
        type: 'move',
        payload: {
          value: index + 1,
          roomId: roomId
        }
      })
    )
  }


  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === 'room-created') {
          setJoined(true)
          setRoomId(message.payload.roomId)
        }
        else if (message.type === 'room-not-found') {
          setErrors(`${message.payload.roomId} not found. Please check again!`)
          setJoined(false)
        }
        else if (message.type === 'joined-room') {
          setErrors('')
          setJoined(true)
          setRoomId(message.payload.roomId)
        }
        else if (message.type === 'waiting') {
          setErrors(message.payload.waitMessage)
          setJoined(true)
        }
        else if (message.type === 'room-full') {
          setErrors(`Room ${message.payload.roomId} is full!`)
          setJoined(false)
        }
        else if (message.type === 'game-started') {
          players[0] = message.payload.players.player1
          players[1] = message.payload.players.player2
          players[2] = message.payload.players.player3
          players[3] = message.payload.players.player4
          setErrors('')
          setStarted(true)
          console.log(players[0].userName)
        }
        else if (message.type === 'moved') {
          // setJoined(false)
          setPlace(message.payload.player.currentPosition)
          console.log(message.payload.player.currentPosition)
        }
      }
    }
  }, [socket])











  if (!socket) return <div>Connecting...</div>;
  return (
    <React.Fragment>
      <div className="h-screen w-screen overflow-hidden">
        <div className="h-16 bg-slate-900 flex justify-between items-center px-20">
          <p className="text-white text-3xl">Great Monopoly</p>
          {joined ? <p className="text-white text-lg">{`RoomId : ${roomId}`}</p> : <div>
            <input type="text" className="w-32 text-black rounded px-2" onChange={handleChange} />
            <button className="bg-green-300 mx-5 px-2 rounded" onClick={handleSubmit}>
              Join Room
            </button>
            <button className="bg-blue-300 mx-10 px-2 rounded" onClick={() => {
              socket?.send(
                JSON.stringify({
                  type: 'create-room'
                })
              )
            }}>
              Create Room
            </button>
          </div>}
        </div>


        {errors && <div className='w-full h-full flex justify-center items-center bg-slate-800'>
          <p className='text-red-500 text-lg'>{errors}</p>
        </div>}

        {started && <div className="relative w-screen h-screen bg-slate-400">
          <div className="board absolute inset-0">
            {num_squares.map((n, index) => {
              const id: number = index + 1;

              return (<GameSquare
                id={id}
                key={id}
              />)
            })}


            <div className="center-square square bg-slate-400">
              <div className="center-txt">
                <div className="flex flex-col gap-5 justify-center items-center">
                  {rolling ? <img src={dice} alt="Dice Rolling" className="w-16 h-16" /> : <img src={dices[currentDice]} alt="Dice Four" className="w-16 h-16" />}
                  <button className="rounded bg-red-300 text-black px-2 py-2 w-16" /*onClick={() => {
                    setRolling(true)
                    const index = Math.floor(Math.random() * dices.length)
                    console.log(index)
                    setCurrentDice(index)
                    setPlace(place + index)
                    setTimeout(() => {
                      setRolling(false)
                      console.log(place)
                      setPosition({ x: ((0.08 * window.innerWidth) + (place * 0.07 * window.innerWidth) + (0.5 * 0.07 * window.innerWidth)), y: (0.09 * window.innerHeight) })
                    }, 1000)
                    socket.send(
                      JSON.stringify({
                        type: 'move',
                        payload: {
                          value: index + 1
                        }
                      })
                    )
                  }}*/ onClick={handleClick}> Roll </button>
                  {/* <div className="h-32 h-32 flex flex-col justify-center items-center">
                    <p>Hello</p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>

          <div className="absolute" style={{ left: position.x, top: position.y }}>
            {/* Add your overlay image here */}
            <img src={Player} alt="Overlay" className="w-[25px] h-[25px]" />
          </div>
        </div>}
      </div>
    </React.Fragment>
  );
}
