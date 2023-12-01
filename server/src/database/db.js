import mongoose from 'mongoose';

const  db = async()=>{
  try {
    const db = await mongoose.connect("mongodb://127.0.0.1:27017/battleship")
    console.log("db connected to ", db.connection.name)
  } catch (error) {
   console.log(error) 
  }


};

export default db