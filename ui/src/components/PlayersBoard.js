import { useEffect, useState } from "react";
import Singleton from "../redux/Singleton";
import Board from "./Board";

function PlayersBoard(props) {
    const room = props.room;
    const [player_1, setPlayer_1] = useState({});
    const [player_2, setPlayer_2] = useState({});
    const [showBoards, setShowBoards] = useState(true)
    const [winnerUser, setWinnerUser] = useState("")
    const singleton = new Singleton();
    const socket = singleton.getSocket();

    socket.on("see_players", (data) => {
        setPlayer_1(data["createdGame"]);
        setPlayer_2(data["joinGame"]);
        /*if (!player_1.inGame || player_1.score === 0) {
            winner(player_2.idUser)
        } else if (!player_2.inGame || player_2.score === 0) {
            winner(player_1.idUser)
        }else {
            socket.emit("see_players", room);
        }*/
    });

    const winner = (user) => {
        setShowBoards(false)
        setWinnerUser(user)
    }

    useEffect(() => {
        socket.emit("see_players", room);
    },);

    return (
        <div className="divColumn viewPlayers">
            <label className="subTitle">{room.idRoom}</label>
            {showBoards ? (
                <div className='manyBoards'>
                    <div className='boardContainer'>
                        <div className='information'>
                            <label className='subTitle'>{player_1.idUser ? player_1.idUser : 'Player 1'}</label>
                            <div className='circleTriangles'><label>{`${player_1.score}Pts`}</label></div>
                        </div>
                        <Board json={player_1.board} button={false} />
                    </div>
                    <div className='boardContainer boardContainer2'>
                        <div className='information'>
                            <label className='subTitle'>{player_2.idUser ? player_2.idUser : 'Player 2'}</label>
                            <div className='circleTriangles'><label>{`${player_2.score}Pts`}</label></div>
                        </div>
                        <Board json={player_2.board} button={false} />
                    </div>
                </div>

            ) : null}
            {!showBoards ? (<h1>{`El Ganador es ${winnerUser}`}</h1>) : null}
        </div>
    );
}

export default PlayersBoard;
