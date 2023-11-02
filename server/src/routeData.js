import express from "express";
import Ship from "./data/Ship.js";
import Element from "./data/Element.js";
import { Column, Row } from "./data/Position.js";
import { matrix } from "./data/matrix.js";
import Singleton from "./Singleton.js";

const routeData = express.Router();
const singleton = new Singleton

function noSpace(text) {
    return text.replace(/[^\w\s]/gi, '').replace(/\s+/g, '')
}

/*NOTE: DATA DEFAULT */
routeData.get("/ship", (req, res) => {
    res.json(Ship);
});

routeData.get("/element", (req, res) => {
    res.json(Element);
});

routeData.get("/position/row", (req, res) => {
    res.json(Row);
});

routeData.get("/position/column", (req, res) => {
    res.json(Column);
});

routeData.get("/matrix/default", (req, res) => {
    res.json(matrix);
});


routeData.get("/player/:nickname", (req, res) => {
    console.log("Nickname recibido:"+ req.params.nickname);

    const nickname = req.params.nickname.toString();
    const data = singleton.getPlayers();
    const playerData = data[noSpace(nickname)];
    if (playerData) {
        res.json(playerData);
    } else {
        res.json({});
    }
});

/*NOTE: PLAYERS */
routeData.post("/create/player", (req, res) => {
    const { nickname } = req.body
    let repeat = true
    while (repeat) {
        const players = singleton.getPlayers();
        const newNickname = `${noSpace(nickname)}${Math.floor(Math.random() * 1000)}`;
        if (!players.hasOwnProperty(newNickname)) {
            singleton.addNickname(newNickname)
            repeat = false
            const data = singleton.getPlayers()
            data[newNickname]["idUser"] = newNickname
            console.log(newNickname)
            res.json(data[newNickname])
        }
    }

});

routeData.get("/all/players", (req, res) => {
    res.json(singleton.getPlayers());
});

routeData.get("/players/avalibles", (req, res) => {
    const playersData = singleton.getPlayers()
    const filteredPlayers = Object.keys(playersData)
        .filter(playerName => !playersData[playerName].inGame)
        .map(playerName => ({
            nickname: playerName,
            inGame: playersData[playerName].inGame
        }));
    res.json(filteredPlayers);
});

/*NOTE: ROOMS */
routeData.get("/room/:idroom", (req, res) => {
    const data = singleton.getRooms();
    const roomData = data[noSpace(req.params.idroom)];
    if (roomData) {
        res.json(roomData);
    } else {
        res.json({});
    }

});

routeData.get("/all/rooms", (req, res) => {
    res.json(singleton.getRooms())
});

routeData.post("/create/room", (req, res) => {
    const { join } = req.body;
    try {
        const players = singleton.getPlayers();
        const rooms = singleton.getRooms();
        let repeat = true;
        while (repeat) {
            const nameRoom = `rm_${Math.floor(Math.random() * 1000)}`;
            if (!rooms.hasOwnProperty(nameRoom)) {
                if (players[join]) {
                    const filteredPlayers = Object.keys(players)
                        .filter(playerName => !players[playerName].inGame)
                        .map(playerName => ({
                            nickname: playerName,
                            inGame: players[playerName].inGame
                        }));
                    const player2 = filteredPlayers
                    rooms[nameRoom] = { createdGame:player2[0]["nickname"], joinGame: join, isActive: true };
                    players[join].inGame = true;
                    players[join].idRoom = nameRoom;
                    players[player2[0]["nickname"]].inGame = true;
                    players[player2[0]["nickname"]].idRoom = nameRoom;
                    repeat = false;
                    const newRoom = singleton.getRooms()
                    const idRooms = newRoom[nameRoom]
                    idRooms["idRoom"] = nameRoom
                    res.json(idRooms);
                } else {
                    res.status(400).json({ error: "Jugadores no encontrados" });
                }
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


export { routeData };