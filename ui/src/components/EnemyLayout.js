import React from 'react';
import Board from './Board';
import { useSelector } from 'react-redux/es/hooks/useSelector';


function EnemyLayout(props) {
    const user = useSelector((state) => state.user);
    const system = useSelector((state) => state.system);


    return (<div className='layout'>
        <div className='divColumn'>
            <h2 className='title'>{`${user.idUser} VS ${user.idNicknameEnemy}`}</h2>
            {system.yourTurn ? (<h2 className='textWait textblink'>{`⌛ Tu Turno ⌛`}</h2>) : null}
            <div className='manyBoards'>
                <div className='boardContainer'>
                    <label className='subTitle'>{"Enemigo"}</label>
                    <Board json={user.defaultBoard} button={true} socket={props.socket}/>
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