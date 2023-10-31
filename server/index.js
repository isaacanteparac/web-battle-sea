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
    //console.log("usuario conectado")
    socket.on("disconnect", () => {
        console.log("usuario desconectado")
    })

    socket.on("players avalibles", async (pa) => {
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
        if (enemy["score"] > 0) {
            enemy["score"] -= 10
        }
        const enemyBoard = enemy["board"]
        const row = newAttack["coordinate"].slice(0, 2);
        const column = newAttack["coordinate"].slice(2);
        enemyBoard[row][column]["element"] = Element.BOMB
        enemyBoard[row][column]["vital"] = VitalConditions.DEAD
        console.log(row)
        console.log(column)
        console.log(enemyBoard[row][column])
        console.log(newAttack)
    })
})



app.use("/data", routeData);

server.listen(app.get("port"));
console.log("SERVER PORT " + app.get("port"));

