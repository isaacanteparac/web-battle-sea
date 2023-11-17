import express from "express";
import Ship from "./data/Ship.js";
import { random_ } from "./randomShips.js";
import Users from "./database/models/Users.js";
import Rooms from "./database/models/Rooms.js"
const routeData = express.Router();

function noSpace(text) {
    return text.replace(/[^\w\s]/gi, '').replace(/\s+/g, '')
}

/*NOTE: DATA DEFAULT */
routeData.get("/ship", (req, res) => {
    res.json(Ship);
});

routeData.get("/player/:userId", async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await Users.findOne({ idUser: userId }).exec();

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json(user);
    } catch (err) {
        console.error('Error al obtener el usuario:', err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

/*NOTE: PLAYERS */
routeData.post("/create/player", async (req, res) => {
    const { nickname } = req.body;
    try {
        let repeat = true;
        while (repeat) {
            const newNickname = nickname.replace(/[^\w\s]/gi, '').replace(/\s+/g, '');
            const idUser = `${noSpace(newNickname)}@${Math.floor(Math.random() * 1000)}`;

            const existingUser = await Users.findOne({ idUser: idUser });

            if (!existingUser) {
                random_.run()
                const newUser = new Users({
                    idUser: idUser,
                    board: random_.getMatrix(),
                    inGame: false,
                    score: 200,
                    defaultBoard: random_.getDefaultMatrix(),
                    yourTurn: false,
                    idRoom:""
                });
                await newUser.save();
                repeat = false;
                res.status(200).json(await Users.findOne({ idUser: idUser }));

            }
        }
    } catch (error) {
        console.error(`Error al crear el usuario: ${error.message}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


routeData.get("/all/players", async (req, res) => {
    try {
        const users = await Users.find({}).exec();
        res.json(users);
    } catch (err) {
        console.error('Error al obtener usuarios:', err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


/*NOTE: ROOMS */
routeData.get("/room/search/:roomId", async (req, res) => {
    const { roomId } = req.params;
    try {
        const room = await Rooms.findOne({ idRoom: roomId });
        if (room) {
            res.status(200).json(room);
        } else {
            res.status(404).json({ error: "Room not found" });
        }
    } catch (err) {
        console.error('Error al obtener la sala:', err);
        res.status(500).json({ error: "Internal Server Error" });
    }

});

routeData.get("/all/rooms", async (req, res) => {
    try {
        const rooms = await Rooms.find({}).exec();
        res.json(rooms);
    } catch (err) {
        console.error('Error al obtener rooms:', err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

//modificar a mongodb
routeData.post("/create/room", async (req, res) => {
    const { join, create } = req.body;
    try {
        let repeat = true;
        while (repeat) {
            let nameRoom = `room@${Math.floor(Math.random() * 1000)}`;
            let existingRoom = await Rooms.findOne({ idRoom: nameRoom });
            if (!existingRoom) {
                const existingUser = await Users.findOne({ idUser: join });
                if (existingUser) {
                    const newRoom = new Rooms({ idRoom: nameRoom, createdGame: create, joinGame: join, isActive: true });
                    await newRoom.save();
                    updateUser(join, { inGame: true, idRoom: nameRoom })
                    updateUser(create, { inGame: true, idRoom: nameRoom, yourTurn: true })
                    repeat = false;
                    const result = await Rooms.findOne({ idRoom: nameRoom })
                    console.log(result)
                    res.status(200).json(result);
                } else {
                    repeat = false;
                    res.status(400).json({ error: "Jugadores no encontrados" });
                }
            }
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


async function updateUser(id, data) {
    return await Users.findOneAndUpdate(
        { idUser: id },
        { $set: data },
        { new: true }
    ).exec();
}


export { routeData };