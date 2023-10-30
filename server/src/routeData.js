import express from "express";
import Ship from "./data/Ship.js";
import Element from "./data/Element.js";
import { Column, Row } from "./data/Position.js";
import Singleton from "./Singleton.js";

const routeData = express.Router();
const singleton = new Singleton

function noSpace(text) {
    return text.replace(/[^\w\s]/gi, '').replace(/\s+/g, '')
}

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


routeData.get("/player/:nickname", (req, res) => {
    const data = singleton.getPlayers();
    const playerData = data[noSpace(req.params.nickname)];
    if (playerData) {
        res.json(playerData);
    } else {
        res.json({});
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
    const { player1, player2 } = req.body;
    const data = singleton.getPlayers();
    const dataPlayer1 = data[player1];
    const dataPlayer2 = data[player2];
    const rooms = singleton.getRooms();
    let repeat = true;
    while (repeat) {
        const nameRoom = `rm_${Math.floor(Math.random() * 1000)}`;
        if (!rooms.hasOwnProperty(nameRoom)) {
            rooms[nameRoom] = { player1, player2 };
            dataPlayer1["inGame"] = true
            dataPlayer1["idRoom"] = nameRoom

            dataPlayer2["idRoom"] = nameRoom
            dataPlayer2["inGame"] = true
            repeat = false
            res.json({ "idRoom": nameRoom });
        }
    }
});


export { routeData };