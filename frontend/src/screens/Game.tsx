import { useLocation } from "react-router-dom"
import { useSocket } from "../hooks/useSocket"
import { useEffect, useState } from "react"
import GameBoard from "../components/GameBoard"


export const Game = () => {
    const location = useLocation()
    const socket = useSocket(location.state.userName)
    const [joined, setJoined] = useState(false);
    const [started, setStarted] = useState(false);
    const [roomId, setRoomId] = useState("");
    const [inputRoomId, setInputRoomId] = useState('');
    const [errors, setErrors] = useState('');

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
                    setErrors('')
                    setStarted(true)
                    console.log(message.payload.gameId)
                }
            }
        }
    }, [socket])

    if (!socket) return <div>Connecting...</div>;
    // return <div className="h-screen w-screen overflow-hidden">
    //     <div className="h-16 bg-slate-900 flex justify-between items-center px-20">
    //         <p className="text-white text-3xl">Great Monopoly</p>
    //         {joined ? <p className="text-white text-lg">{`RoomId : ${roomId}`}</p> : <div>
    //             <input type="text" className="w-32 text-black rounded px-2" onChange={handleChange} />
    //             <button className="bg-green-300 mx-5 px-2 rounded" onClick={handleSubmit}>
    //                 Join Room
    //             </button>
    //             <button className="bg-blue-300 mx-10 px-2 rounded" onClick={() => {
    //                 socket?.send(
    //                     JSON.stringify({
    //                         type: 'create-room'
    //                     })
    //                 )
    //             }}>
    //                 Create Room
    //             </button>
    //         </div>}
    //     </div>
    return(
        <GameBoard/>
    )


    //     {errors && <div className='w-full h-full flex justify-center items-center bg-slate-800'>
    //         <p className='text-red-500 text-lg'>{errors}</p>
    //     </div>}

    //     {started && <div className="flex w-screen h-full">
    //         <GameBoard />
    //     </div>}

    // </div>
}