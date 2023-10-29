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

routeData.get("/player/matrix/:nickname", (req, res) => {
    const nickname = req.params.nickname;
    const data = singleton.getPlayers();
    const playerData = data[noSpace(nickname)];

    if (playerData && playerData["board"]) {
        res.json(playerData["board"]);
    } else {
        res.json({});
    }
});

routeData.get("/player/:nickname", (req, res) => {
    const nickname = req.params.nickname;
    const data = singleton.getPlayers();
    const playerData = data[noSpace(nickname)];

    if (playerData) {
        res.json(playerData);
    } else {
        res.json({});
    }
});

routeData.get("/all/players", (req, res) => {
    res.json(singleton.getPlayers());
});

routeData.get("/players/nickname", (req, res) => {
    res.json(singleton.getPlayers());
});


export { routeData };