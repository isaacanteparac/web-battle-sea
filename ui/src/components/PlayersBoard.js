import { useEffect, useState } from "react";
import Singleton from "../redux/Singleton";
import Board from "./Board";

function PlayersBoard(props) {
    const room = props.room;
    const [player_1, setPlayer_1] = useState({});
    const [player_2, setPlayer_2] = useState({});
    const singleton = new Singleton();
    const socket = singleton.getSocket();
    const [init, setInit] = useState(false);

    socket.on("see_players", (data) => {
        setPlayer_1(data["createdGame"]);
        setPlayer_2(data["joinGame"]);
    });

    useEffect(() => {
        if (!init) {
            const interval = setInterval(() => {
                socket.emit("see_players", room);
            }, 4000);

            return () => clearInterval(interval);
        }
        else {
            socket.emit("see_players", room);
            setInit(false)
        }
    }, [socket, room]);

    return (
        <div className="divColumn viewPlayers">
            <div className='manyBoards'>
                <div className='boardContainer'>
                    <div className='information'>
                        <label className='subTitle'>{player_1.idUser ? player_1.idUser : 'Player 1'}</label>
                        <div style={{color:"#5f3cf0"}}><label>{`${player_1.score}Pts`}</label></div>
                    </div>
                    <Board json={player_1.board} button={false} />
                </div>
                <div className='boardContainer boardContainer2'>
                    <div className='information'>
                        <label className='subTitle'>{player_2.idUser ? player_2.idUser : 'Player 2'}</label>
                        <div style={{color:"#5f3cf0"}}><label>{`${player_2.score}Pts`}</label></div>
                    </div>
                    <Board json={player_2.board} button={false} />
                </div>
            </div>
        </div>
    );
}

export default PlayersBoard;
