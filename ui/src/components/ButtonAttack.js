import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { thunks_ } from '../redux/thunks_';

function ButtonAttack(props) {
    const user = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const [classColor, setClassColor] = useState("btnCirle")


    const socket = props.socket

    /*TODO: CONTORL DE COLORES, AL HACER CLICK TODOS LO BOTONES SE CAMBIAN DE COLOR, NO SOLO DE UN COMPONENTE
    Y TAMPOCO SE ACTUALIZA EL COMPONENTE TAMBLERO COMO OCURRIA ANTERIORMENTE,
    */
    const attackSend = () => {
        if (classColor === "btnCirle") {
            console.log("click en boton" + props.position)
            const data = { coordinate: props.position, idUser: user.idUser, idNicknameEnemy: user.idNicknameEnemy }
            socket.emit("attack", data)
            dispatch(thunks_.attackSend(socket, setClassColor))

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