import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { setShowTextWait, setShowMyBoard, setTextMyBoard } from '../redux/systemSlice';
import { changeNickname, changeIdNicknameEnemy } from '../redux/userSlice';
import { io } from 'socket.io-client';
import { thunks_ } from '../redux/thunks_';



function Input_(props) {

    const [showOptions, setShowOptions] = useState(false)
    const user = useSelector((state) => state.user)
    const socket = props.socket
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
        if (!showOptions) {
            socket.emit("players avalibles", "")
            socket.on("players avalibles", (data) => {
                console.log("load player")
                if (data.length > 0) {
                    dispatch(changeIdNicknameEnemy(data[0]["nickname"]))
                    setShowOptions(true)
                    socket.off("players avalibles")
                }
            })
        }
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
            <button className="send keep" onClick={() => createRoom()}>{"Unirse"}</button></>) : null
        }

    </div>

    );
}

export default Input_;