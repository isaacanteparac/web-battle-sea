import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { io } from 'socket.io-client';
import { thunks_ } from '../redux/thunks_';

function ButtonAttack(props) {
    const user = useSelector((state) => state.user)
    const system = useSelector((state) => state.system)

    const dispatch = useDispatch()
    const [classColor, setClassColor] = useState("btnCirle")


    const socket = io(process.env.REACT_APP_API_URL)

    const attackSend =  () => {
        if (classColor == "btnCirle") {
            const data = { coordinate: props.position, idUser: user.idUser, idNicknameEnemy: user.idNicknameEnemy }
            socket.emit("attack", data)
            socket.on("attack", (data) => {
                setClassColor(data)
                //dispatch(thunks_.attackSend(data))
            })
        
        }
    }


    return (<button
        onClick={() => { attackSend() }}
        key={props.colIndex}
        className={classColor}
    >
        <label className='textCircle'>{`${props.position}`}</label>
    </button>);
}

export default ButtonAttack;