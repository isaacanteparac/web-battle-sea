import React, { useEffect } from 'react';
import Board from './Board';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { thunks_ } from '../redux/thunks_';
import { useDispatch } from 'react-redux';
import Singleton from '../redux/Singleton';
import Timer from './Timer';

function EnemyLayout() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch()
    const singleton = new Singleton()
    const socket = singleton.getSocket()


    dispatch(thunks_.getUpdateData(socket));

    useEffect(() => {
        socket.emit("update_data", {idUser: user.idUser, idRoom: user.idRoom});
    }, [])



    return (<div className='layout'>
        <div className='divColumn'>
            <h2 className='title'>{`${user.idNicknameEnemy} VS ${user.idUser}`}</h2>
            <div className='information'>
                <div className='circleTriangles'><label>{`${user.score}Pts`}</label></div>
                <Timer/>
            </div>
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