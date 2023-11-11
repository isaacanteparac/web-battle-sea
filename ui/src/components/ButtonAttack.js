import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { thunks_ } from '../redux/thunks_';
import Singleton from '../redux/Singleton';

function ButtonAttack(props) {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [classColor, setClassColor] = useState("btnCirle")
    const singleton = new Singleton()
    const socket = singleton.getSocket()

    const attackSend = () => {
        if (user.yourTurn) {
            if (classColor === "btnCirle") {
                const data = { coordinate: props.position, idUser: user.idUser, idNicknameEnemy: user.idNicknameEnemy, yourTurn: user.yourTurn}
                socket.emit("attack", data)
                dispatch(thunks_.attackSend(socket, setClassColor))
            }
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