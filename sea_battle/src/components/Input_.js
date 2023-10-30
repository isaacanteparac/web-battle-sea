import React, { useEffect, useState } from 'react';

import { io } from "socket.io-client";
import { useDispatch } from 'react-redux';
import { fetch_ } from '../util/fetch';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { setShowTextWait, setShowMyBoard, setTextMyBoardd } from '../redux/systemSlice';
import { changeBoard, changeIdRoom, changeInGame, changeNickname, changeNicknameEnemy } from '../redux/userSlice';



function Input_() {

    const [showOptions, setShowOptions] = useState(false)
    const serverPort = process.env.REACT_APP_API_URL
    const socket = io(serverPort);
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()


    const send = () => {
        if (user.nickname != "") {
            if (Object.keys(loadPlayer).length === 0) {
                socket.emit("nickname", user.nickname);
            }
            if (!showOptions) {
                restore();
            }

        }
    }

    const restore = () => {
        loadPlayer(true);
        dispatch(setShowTextWait(true))
        dispatch(setShowMyBoard(true))
        dispatch(setTextMyBoardd(`Tablero de "${user.nickname}"`))

    }

    const loadPlayer = async (load = false) => {
        let data = await fetch_("player/" + user.nickname)
        if (load) {
            dispatch(changeBoard(data["board"]))
        }
        return data
    }

    const createRoom = async () => {
        send()
        if (user.nicknameEnemy != "") {
            const newRoom = { player1: user.nickname, player2: user.nicknameEnemy }
            const idRoom = await fetch_("create/room", newRoom, "POST")
            if (idRoom) {
                dispatch(changeInGame(true));
                dispatch(changeIdRoom(idRoom));
                console.log(idRoom);
            }
        }
        restore()


    }

    socket.on("players avalibles", (data) => {
        if (data.length > 0) {
            dispatch(changeNicknameEnemy(data[0]["nickname"]))
            setShowOptions(true)
        }
    })

    useEffect(() => { socket.emit("players avalibles", "") }, [])


    return (<div className='separator'>

        <div className='inputBox'>
            <input placeholder="nickname" type='text' value={user.nickname} onChange={(e) => dispatch(changeNickname(e.target.value))} />
            {!showOptions ? (<button className="send" onClick={() => send()}>{">"}</button>) : null}
        </div>
        {showOptions ? (<>
            <label className='textWait'>{"VS"}</label>
            <div className='inputBox'>
                <input placeholder="nickname" type='text' value={user.nicknameEnemy} disabled={true} />
            </div>
            <button className="send keep" onClick={() => createRoom()}>{"Guardar"}</button></>) : null
        }

    </div>

    );
}

export default Input_;