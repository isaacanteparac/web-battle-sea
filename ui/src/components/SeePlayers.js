import { useEffect, useState } from "react";
import { fetch_ } from "../util/fetch";
import PlayersBoard from "./PlayersBoard";

function SeePlayers() {
    const [listRooms, setListRooms] = useState([]);
    const [showlistRooms, setShowListRooms] = useState(true);
    const [selectedRoom, setSelectedRoom] = useState(null);

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
    };

    return (
        <div>
            {showlistRooms ? (
                listRooms.map((room) => (
                    <button
                        key={room.idRoom}
                        style={{ backgroundColor: 'white' }}
                        onClick={() => handleRoomClick(room)}
                    >
                        <p>Room Name: {room.idRoom}</p>
                        <p>Player 1: {room.createdGame}</p>
                        <p>Player 2: {room.joinGame}</p>
                    </button>
                ))
            ) : null}
            {!showlistRooms && selectedRoom && (
                <PlayersBoard room={selectedRoom}/>
            )}
        </div>
    );
}

export default SeePlayers;
