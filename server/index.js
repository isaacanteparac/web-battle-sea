import express from "express";
import morgan from "morgan";
import { Server as SocketServer } from "socket.io";
import { createServer } from "node:http";
import cors from "cors";

import Ship from "./src/data/ship.js"
import Element from "./src/data/element.js"
import {matrix} from "./src/data/matrix.js";
import { Column, Row } from "./src/data/position.js";




const port = 6060;
const app = express();
const server = createServer(app);



const io = new SocketServer(server, { cors: { origin: "*", methods: ['GET', 'POST'] } });


app.set("port", process.env.PORT || port);
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ limit: "15mb", extended: true }))
io.on("connection", () => { console.log("usuario conectado") })



app.get("/data/ship", (req, res) => {
    res.json(Ship)
})

app.get("/data/element", (req, res) => {
    res.json(Element)
})

app.get("/data/position/row", (req, res) => {
    res.json(Row)
})

app.get("/data/position/column", (req, res) => {
    res.json(Column)
})
app.get("/data/matrix",(req, res)=>{
    res.json(matrix)
})


server.listen(app.get("port"));
console.log("SERVER PORT " + app.get("port"));

