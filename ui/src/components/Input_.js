import React, {useState } from 'react';

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

    const createNewUser = (inputId = "") => {
        if (user.nickname !== "") {
            document.getElementById(inputId).disabled = true;
            if (!showOptions) {
                dispatch(thunks_.createUserAndRoom(user))
            } else {
                dispatch(thunks_.createUserAndRoom(user, true))
            }
            dispatch(restore())
            
        }
    }

    const restore = () => {
        return async (dispatch) => {
            dispatch(setShowTextWait(true))
            dispatch(setShowMyBoard(true))
            dispatch(setTextMyBoard(`Tablero de "${user.nickname}"`))
        }
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
        <label className='subTitle'>Registrate</label>
        <div className='inputBox'>
            <input placeholder="nickname" autoComplete='off' id='inputCreated' type='text' value={user.nickname} onClick={() => loadPlayers()} onChange={(e) => dispatch(changeNickname(e.target.value))} />
            {!showOptions ? (<button className="send" id='btnCreated' onClick={() => createNewUser("inputCreated")}>{">"}</button>) : null}
        </div>
        {showOptions ? (<>
            <label className='textWait'>{"VS"}</label>
            <div className='inputBox'>
                <input placeholder="nickname" type='text' value={user.idNicknameEnemy} disabled={true} />
            </div>
            <button className="send keep" id='btnjoin' onClick={() => createNewUser("inputCreated")}>{"Unirse"}</button></>) : null
        }
    </div>

    );
}

export default Input_;