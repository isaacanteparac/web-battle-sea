import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { setShowTextWait, setShowMyBoard, setTextMyBoard } from '../redux/systemSlice';
import { changeNickname, changeIdNicknameEnemy, changeIdUser, changeDefaultBoard, updateAllDataUser, changeCreator } from '../redux/userSlice';
import { io } from 'socket.io-client';
import { thunks_ } from '../redux/thunks_';



function Input_() {

    const [showOptions, setShowOptions] = useState(false)
    const user = useSelector((state) => state.user)
    const socket = io(process.env.REACT_APP_API_URL)
    const dispatch = useDispatch()

    const createNewUser = () => {
        dispatch(thunks_.createUserAndRoom(user))
        if (!showOptions) {
            dispatch(restore());
        }
    }


    const restore = () => {
        return async (dispatch) => {
            dispatch(setShowTextWait(true))
            dispatch(setShowMyBoard(true))
            dispatch(setTextMyBoard(`Tablero de "${user.nickname}"`))
        }

    }


    const createRoom = () => {
        dispatch(thunks_.createUserAndRoom(user, true))
        dispatch(restore());
    }

    const loadPlayers = () => {
        socket.emit("players avalibles", "")
        socket.on("players avalibles", (data) => {
            if (data.length > 0) {
                dispatch(changeIdNicknameEnemy(data[0]["nickname"]))
                setShowOptions(true)
            }
        })
    }

    return (<div className='separator'>

        <div className='inputBox'>
            <input placeholder="nickname" type='text' value={user.nickname} onClick={() => loadPlayers()} onChange={(e) => dispatch(changeNickname(e.target.value))} />
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