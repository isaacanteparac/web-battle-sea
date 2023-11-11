import express from "express";
import morgan from "morgan";
import { Server as SocketServer } from "socket.io";
import { createServer } from "node:http";
import cors from "cors";
import Singleton from "./src/Singleton.js";

import { routeData } from "./src/routeData.js";
import VitalConditions from "./src/data/VitalConditions.js";
import Element from "./src/data/Element.js";

const port = 6060;
const app = express();
const server = createServer(app);

const io = new SocketServer(server, { cors: { origin: "*", methods: ['GET', 'POST'] } });
app.set("port", process.env.PORT || port);
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ limit: "15mb", extended: true }))

const instance = new Singleton();

io.on("connection", (socket) => {
    socket.on("players avalibles", async () => {
        const playersData = instance.getPlayers()
        const filteredPlayers = Object.keys(playersData)
            .filter(playerName => !playersData[playerName].inGame)
            .map(playerName => ({
                nickname: playerName,
                inGame: playersData[playerName].inGame
            }));
        io.emit("players avalibles", filteredPlayers);
    })


    socket.on("data user", async (nickname) => {
        const data = instance.getPlayers();
        const playerData = await data[nickname];
        if (playerData) {
            io.emit("data user", playerData);
        }
    })

    socket.on("attack", async (newAttack) => {
        const players = instance.getPlayers();
        const enemy = players[newAttack["idNicknameEnemy"]]
        const user = players[newAttack["idUser"]]
        if (enemy["score"] > 0) {
            enemy["score"] -= 10
        }
        const enemyBoard = enemy["board"]
        const row = newAttack["coordinate"].slice(0, 2);
        const column = newAttack["coordinate"].slice(2);
        const element = enemyBoard[row][column]["element"]
        if (element == Element.OCEAN || element == Element.BOMB) {
            user["color"] = "btnBlue"

        } else {
            enemyBoard[row][column]["element"] = Element.BOMB
            enemyBoard[row][column]["vital"] = VitalConditions.DEAD
            user["color"] = "btnRed"

        }
        user["yourTurn"] = false
        enemy["yourTurn"] = true
        const newData = {
            color: user["color"],
            score: user["score"]
        }
        socket.emit("attack", newData)
    })

    socket.on("update_board", async (nickname) => {
        const data = instance.getPlayers();
        if (nickname != "") {
            const playerData = await data[nickname];
            if (playerData) {
                socket.emit("update_board", playerData["board"])
            }
        }
    })

    socket.on("update_turn", async (nickname) => {
        const data = instance.getPlayers();
        if (nickname != "") {
            const playerData = await data[nickname];
            if (playerData) {
                socket.emit("update_turn", playerData["yourTurn"])
            }
        }
    })
})



app.use("/data", routeData);

server.listen(app.get("port"));
console.log("SERVER PORT " + app.get("port"));
