// socketHandler.js
import { Server as SocketServer } from "socket.io";
import { ctrlSocket } from "./controllerSocket.js";
import Users from "./database/models/Users.js";
import Rooms from "./database/models/Rooms.js";

export function setupSocket(server) {
    const io = new SocketServer(server, { cors: { origin: "*", methods: ['GET', 'POST'] } });

    io.on("connection", (socket) => {

        socket.on("close", () => {
            console.log('Cliente desconectado');
        });

        socket.on("available_players", async () => {
            const data = await Users.findOne({ isActive: true });
            io.emit("available_players", data);
        })


        socket.on("user_data", async (userId) => {
            const data = await Users.findOne({ idUser: userId });
            if (data) {
                if(data.idRoom !== ""){
                    const room = await Rooms.findOne({ idRoom: data.idRoom });
                    const player2 = await Users.findOne({idUser: room.joinGame})
                    if(player2.isActive){
                        io.emit("user_data", data);
                    }
                }
            }
        })

        socket.on("attack", async (newAttack) => {
            const data = await ctrlSocket.receiverAttack(newAttack)
            socket.emit("attack", data)
        })

        socket.on("update_data", async (data) => {
            if (data["idUser"] != "" && data["idRoom"] != "") {
                const dataUser = await Users.findOne({ idUser: data["idUser"] });
                const dataRoom = await Rooms.findOne({ idRoom: data["idRoom"] });
                if (dataUser && dataRoom) {
                    const specificData = {
                        board:  dataUser["board"],
                        yourTurn: dataUser["yourTurn"],
                        score: dataUser["score"],
                        winner: dataRoom["winner"],
                        isActive: dataRoom["isActive"]
                    }
                    socket.emit("update_data", specificData)
                }
            }
        })


        socket.on("see_players", async (room) => {
            try {
                if (room.isActive) {
                    const get = { idUser: 1, board: 1, score: 1, yourTurn: 1, inGame: 1, _id: 0 };
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


        socket.on("sleep_timer", async (data) => {
            try {
                await Users.findOneAndUpdate(
                    { idUser: data["idUser"] },
                    { $set: { yourTurn: !data["yourTurn"], } },
                    { new: true }
                );
                await Users.findOneAndUpdate(
                    { idUser: data["idNicknameEnemy"] },
                    {
                        $set: {
                            yourTurn: data["yourTurn"],
                        }
                    },
                    { new: true }
                );
            } catch (error) {
                console.error("Error occurred:", error);
            }
        });

    })

}