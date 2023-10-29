import express from "express";
import morgan from "morgan";
import { Server as SocketServer } from "socket.io";
import { createServer } from "node:http";
import cors from "cors";
import Singleton from "./src/Singleton.js";

import { routeData } from "./src/routeData.js";

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
    socket.on("nickname", (nickname) => {
        instance.addNickname(nickname)
        io.emit("msg", "te respondo autentico mierda");
    })
})



app.use("/data", routeData);

server.listen(app.get("port"));
console.log("SERVER PORT " + app.get("port"));

