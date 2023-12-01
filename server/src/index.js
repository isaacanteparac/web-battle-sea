import express from "express";
import morgan from "morgan";
import { createServer } from "node:http";
import {routeData} from "./routerHandler.js";
import cors from "cors";
import { setupSocket } from "./socketHandler.js";
import db from "./database/db.js";
const port = 6060;
const app = express();
const server = createServer(app);


app.set("port", process.env.PORT || port);
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ limit: "15mb", extended: true }))

db()

setupSocket(server)

app.use("/data", routeData);

server.listen(app.get("port"));
console.log("SERVER PORT " + app.get("port"));
