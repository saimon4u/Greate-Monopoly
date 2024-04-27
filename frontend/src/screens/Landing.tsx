import { useNavigate } from "react-router-dom"
import { useState } from 'react'

export const Landing = () => {



    const navigate = useNavigate();

    const [userName, setUserName] = useState('');
    const [errors, setErrors] = useState('');
    // const [submitting, setSubmitting] = useState(false);

    const validateUserName = (inputValues: string) => {
        if (inputValues.length == 0) {
            setErrors("UserName can't be empty")
            return
        }
        if (inputValues.length > 10) {
            setErrors("UserName is too long")
            return
        }
        navigate('/game', { state: { userName: userName } });
    };

    //@ts-ignore
    const handleChange = (e) => {
        setErrors('')
        setUserName(e.target.value);
    };

    //@ts-ignore
    const handleSubmit = (event) => {
        event.preventDefault();
        validateUserName(userName)
    };






    return <div className="w-screen h-screen bg-slate-900 flex justify-center items-center">
        <div className="flex flex-col gap-y-3 justify-center items-center text-white">
            <p>Enter Your Name</p>
            {(errors.length != 0 && <p className="text-red-600">{errors}</p>)}
            <div className="flex flex-col gap-y-10">
                <input type="text" className="rounded h-8 w-48 text-black px-2" name="userName" value={userName} onChange={handleChange}/>
                <button className="bg-green-500 rounded text-black h-16" onClick={handleSubmit}>
                    Join Game
                </button>
            </div>
        </div>
    </div>
}