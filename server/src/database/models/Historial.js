import mongoose from "mongoose";


const historialSchema = new mongoose.Schema({
    column: String,
    idNicknameEnemy: String,
    idRoom: String,
    idUser: String,
    row: String
  });
  
  const Historial = mongoose.model('Historial', historialSchema);

  export default  Historial