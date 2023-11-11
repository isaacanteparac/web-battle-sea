import React, { useEffect } from 'react';
import Board from './Board';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { thunks_ } from '../redux/thunks_';
import { useDispatch } from 'react-redux';
import Singleton from '../redux/Singleton';


function EnemyLayout() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch()
    const singleton = new Singleton()
    const socket = singleton.getSocket()

    dispatch(thunks_.updateBoard(socket))
    dispatch(thunks_.updateTurn(socket))
    useEffect(()=>{
        socket.emit("update_board", user.idUser)
        socket.emit("update_turn", user.idUser)

    })

    return (<div className='layout'>
        <div className='divColumn'>
            <h2 className='title'>{`${user.idUser} VS ${user.idNicknameEnemy}`}</h2>
            {user.yourTurn ? (<h2 className='textWait textblink'>{`⌛ Tu Turno ⌛`}</h2>) : (<h2 className='textWait textblink'>{`⌛ Espera Ataque ⌛`}</h2>)}
            <div className='manyBoards'>
                <div className='boardContainer'>
                    <label className='subTitle'>{"Enemigo"}</label>
                    <Board json={user.defaultBoard} button={true} />
                </div>
                <div className='boardContainer boardContainer2'>
                    <label className='subTitle'>{"Yo"}</label>
                    <Board json={user.board} button={false} />
                </div>
            </div>

        </div>
    </div>);
}

export default EnemyLayout;