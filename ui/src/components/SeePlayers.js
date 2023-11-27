import { useEffect, useState } from "react";
import { fetch_ } from "../util/fetch";
import PlayersBoard from "./PlayersBoard";

function SeePlayers() {
    const [listRooms, setListRooms] = useState([]);
    const [showlistRooms, setShowListRooms] = useState(true);
    const [selectedRoom, setSelectedRoom] = useState(null);
    const [nameRoom, setNameRoom] = useState("Rooms")

    const getAllRooms = async () => {
        const url = "all/rooms";
        const data = await fetch_(url);
        setListRooms(Object.values(data));
    };

    useEffect(() => {
        getAllRooms();
    }, []);

    const handleRoomClick = (room) => {
        setSelectedRoom(room);
        setShowListRooms(false);
        setNameRoom(room.idRoom)
    };

    return (
        <div className="watchGameBox">
            <h1>{nameRoom}</h1>
            {showlistRooms ? (

                listRooms.map((room) => (
                    <button
                        className={room.isActive ? "watchGameButtonYes" : "watchGameButtonYes watchGameButtonNo"}
                        key={room.idRoom}
                        onClick={() => handleRoomClick(room)}
                    >
                        <ul>
                            <li><label>Nombre:</label> {room.idRoom}</li>
                            <li><label>Player 1:</label> {room.createdGame}</li>
                            <li><label>Player 2:</label> {room.joinGame}</li>
                            <li><label>Online:</label> {room.isActive ? "Si" : "No"}</li>
                            <li>
                                <label>Ganador:</label>
                                {room.winner === null || room.winner.trim() === "" ? "Ninguno" : room.winner}
                            </li>
                        </ul>


                    </button>
                ))
            )

                : null}
            {!showlistRooms && selectedRoom && (
                <PlayersBoard room={selectedRoom} />
            )}
        </div>
    );
}

export default SeePlayers;
