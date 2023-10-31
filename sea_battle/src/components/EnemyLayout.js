import React, { useEffect } from 'react';
import Board from './Board';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';
import { changeEnemyBoard } from '../redux/userSlice';
import { fetch_ } from '../util/fetch';


function EnemyLayout() {

    const user = useSelector((state) => state.user);
    const dispatch = useDispatch()



    const boardDefault = async () => {
        const eBoard = await fetch_("matrix/default")
        dispatch(changeEnemyBoard(eBoard))
    }

    useEffect(() => { boardDefault() })



    return (<div className='layout'>
        <div className='divColumn'>
            <h2 className='title'>{`${user.idUser} VS ${user.idNicknameEnemy}`}</h2>
            <div className='manyBoards'>
                <div className='boardContainer'>
                    <label className='subTitle'>{user.idNicknameEnemy}</label>
                    <Board json={user.enemyBoard} button={true} />
                </div>
                <div className='boardContainer boardContainer2'>
                    <label className='subTitle'>{user.idUser}</label>
                    <Board json={user.board} button={false} />
                </div>
            </div>

        </div>
    </div>);
}

export default EnemyLayout;