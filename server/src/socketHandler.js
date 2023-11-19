// socketHandler.js
import { Server as SocketServer } from "socket.io";
import { ctrlSocket } from "./controllerSocket.js";
import Users from "./database/models/Users.js";

export function setupSocket(server) {
    const io = new SocketServer(server, { cors: { origin: "*", methods: ['GET', 'POST'] } });
    let Id

    io.on("connection", (socket) => {
        console.log("connect")

        socket.on("close", () => {
            console.log('Cliente desconectado');
        });

        socket.on("available_players", async () => {
            const data = await Users.findOne({ inGame: false });
            io.emit("available_players", data);
        })


        socket.on("user_data", async (userId) => {
            const data = await Users.findOne({ idUser: userId });
            if (data) {
                io.emit("user_data", data);
            }
        })

        socket.on("attack", async (newAttack) => {
            const data = await ctrlSocket.receiverAttack(newAttack)
            socket.emit("attack", data)
        })

        socket.on("update_board", async (userId) => {
            if (userId != "" || userId != null) {
                const data = await Users.findOne({ idUser: userId });
                if (data) {
                    socket.emit("update_board", data["board"])
                }
            }
        })

        socket.on("update_turn", async (userId) => {
            if (userId != "" || userId != null) {
                const data = await Users.findOne({ idUser: userId });
                if (data) {
                    socket.emit("update_turn", data["yourTurn"])
                }
            }
        })

        socket.on("see_players", async (room) => {
            try {
                if (room.isActive) {
                    const get = { idUser: 1,board: 1, score: 1, yourTurn: 1, inGame: 1, _id: 0 };
                    const createdGame = await Users.findOne({ idUser: room.createdGame }, get);
                    const joinGame = await Users.findOne({ idUser: room.joinGame }, get);
                    const players = {
                        createdGame,
                        joinGame
                    };
                    socket.emit("see_players", players);
                } else {
                    console.log("Room is not active or invalid data.");
                }
            } catch (error) {
                console.error("Error occurred:", error);
            }
        });
        
    })

}
