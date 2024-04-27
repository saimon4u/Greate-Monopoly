import { useLocation } from "react-router-dom"
import { useSocket } from "../hooks/useSocket"

export const Game = ()=>{
    const location = useLocation()
    const socket = useSocket(location.state.userName)
    return <div>
        <div className="h-16 bg-slate-900 flex justify-between items-center px-20">
        <p className="text-white">Great Monopoly</p>
        <div>
            <input type="text" className="w-32 text-black rounded"/>
            <button className="bg-green-300 mx-5 px-2 rounded" onClick={() => {
                          socket?.send(
                            JSON.stringify({
                              type: 'init-game',
                            }),
                          );
                        }}>
                Join Room
            </button>
            <button className="bg-blue-300 mx-10 px-2 rounded" onClick={()=>{
                socket?.send(
                    JSON.stringify({
                        type: 'create-room'
                    })
                )
            }}>
                Create Room
            </button>
        </div>
    </div>
    </div>
}