import React, { useEffect } from 'react';
import Board from './Board';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { thunks_ } from '../redux/thunks_';
import { useDispatch } from 'react-redux';
import Singleton from '../redux/Singleton';


function EnemyLayout() {
    const user = useSelector((state) => state.user);
    const system = useSelector((state) => state.system);
    const dispatch = useDispatch()
    const singleton = new Singleton()
    const socket = singleton.getSocket()



    /*TODO: HACER QUE SE ACTUALICE AUTOMATICAMENTE PARA QUE SE ACTULIZE EL BOARD Y NO CADA VEZ QUE SE HAGA CLICK
    CORREGIR EL BUG DEL CUANDO EL CREADOR NO PUEDE ENVIAR EL ATAQUE, SINO QUE SE ATACA ASI MISMO */
    useEffect(()=>{
        dispatch(thunks_.updateBoard(socket, user.idUser))

    })
    //



    return (<div className='layout'>
        <div className='divColumn'>
            <h2 className='title'>{`${user.idUser} VS ${user.idNicknameEnemy}`}</h2>
            {system.yourTurn ? (<h2 className='textWait textblink'>{`⌛ Tu Turno ⌛`}</h2>) : null}
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