import React, { useEffect, useState } from 'react';

import { useDispatch } from 'react-redux';
import { fetch_ } from '../util/fetch';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { setShowTextWait, setShowMyBoard, setTextMyBoard } from '../redux/systemSlice';
import { changeBoard, changeNickname, changeIdNicknameEnemy, changeIdUser } from '../redux/userSlice';
import { io } from 'socket.io-client';



function Input_() {

    const [showOptions, setShowOptions] = useState(false)
    const user = useSelector((state) => state.user)
    const socket = io(process.env.REACT_APP_API_URL)
    const dispatch = useDispatch()

    const createNewUser = async () => {
        const newUser = await fetch_("create/player", { "nickname": user.nickname }, "POST")
        //tengo un problema no se actualisa el estado , ya use promise, pero no se actualiza, por eso retrono el nickname
        //para poder crear el room
        dispatch(changeIdUser(newUser["idUser"]))
        dispatch(changeBoard(newUser["board"]))
        if (!showOptions) {
            restore();
        }
        return newUser["idUser"]

    }


    const restore = () => {
        dispatch(setShowTextWait(true))
        dispatch(setShowMyBoard(true))
        dispatch(setTextMyBoard(`Tablero de "${user.nickname}"`))
    }


    const createRoom = async () => {
        const n = await createNewUser()
        dispatch(changeIdUser(n))
        await fetch_("create/room", { player1: n }, "POST")
        restore()
    }

    socket.on("players avalibles", (data) => {
        if (data.length > 0) {
            dispatch(changeIdNicknameEnemy(data[0]["nickname"]))
            setShowOptions(true)
        }
    })


    useEffect(() => { socket.emit("players avalibles", "") }, [])


    return (<div className='separator'>

        <div className='inputBox'>
            <input placeholder="nickname" type='text' value={user.nickname} onChange={(e) => dispatch(changeNickname(e.target.value))} />
            {!showOptions ? (<button className="send" onClick={() => createNewUser()}>{">"}</button>) : null}
        </div>
        {showOptions ? (<>
            <label className='textWait'>{"VS"}</label>
            <div className='inputBox'>
                <input placeholder="nickname" type='text' value={user.idNicknameEnemy} disabled={true} />
            </div>
            <button className="send keep" onClick={() => createRoom()}>{"Guardar"}</button></>) : null
        }

    </div>

    );
}

export default Input_;