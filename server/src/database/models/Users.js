import mongoose from 'mongoose';

const usersSchema = new mongoose.Schema({
  board: Object,
  defaultBoard: Object,
  idUser: String,
  inGame: Boolean,
  isActive: Boolean,
  score: Number,
  yourTurn: Boolean,
  idRoom: String
});

const Users = mongoose.model('Users', usersSchema);

export default Users;
