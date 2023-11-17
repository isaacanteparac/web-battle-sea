import React, { useState } from 'react';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { setShowTextWait, setShowMyBoard, setTextMyBoard } from '../redux/systemSlice';
import { changeNickname, changeIdNicknameEnemy } from '../redux/userSlice';
import { thunks_ } from '../redux/thunks_';
import Singleton from '../redux/Singleton';



function Input_() {

    const [showOptions, setShowOptions] = useState(false)
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const singleton = new Singleton()
    const socket = singleton.getSocket()
  

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
            socket.emit("available_players", "")
            socket.on("available_players", (data) => {
                if (data != null) {
                    dispatch(changeIdNicknameEnemy(data["idUser"]))
                    setShowOptions(true)
                    socket.off("available_players")
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