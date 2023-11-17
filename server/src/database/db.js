// db.js
import mongoose from 'mongoose';

//const mongoURI = 'mongodb://isisaac:2002@localhost:27017/Play_db?authMechanism=SCRAM-SHA-256&retryWrites=true&w=majority';

// Configuración de la conexión a MongoDB con Mongoose
const  db = async()=>{
  try {
    const db = await mongoose.connect("mongodb://127.0.0.1:27017/battleship")
    console.log("db connected to ", db.connection.name)
  } catch (error) {
   console.log(error) 
  }


};

export default db