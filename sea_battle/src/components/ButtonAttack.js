import React from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { io } from 'socket.io-client';


function ButtonAttack(props) {
    const user = useSelector((state) => state.user)


    const socket = io(process.env.REACT_APP_API_URL)

    const attackSend = () => {
        socket.emit("attack", { coordinate: props.position, idUser: user.idUser, idNicknameEnemy: user.idNicknameEnemy })
    }

    return (<button
        onClick={() => { attackSend() }}
        key={props.colIndex}
        className="circle"
        style={{ backgroundColor: props.color }}
    >
        <label className='textCircle'>{`${props.position}`}</label>
    </button>);
}

export default ButtonAttack;