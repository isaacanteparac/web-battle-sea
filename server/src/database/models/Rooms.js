import mongoose from "mongoose";

const roomsSchema = new mongoose.Schema({
    idRoom: String,
    isActive: Boolean,
    createdGame: String,
    joinGame: String,
    winner: String
});

const Rooms = mongoose.model('Rooms', roomsSchema);

export default Rooms