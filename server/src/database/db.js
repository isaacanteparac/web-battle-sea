import mongoose from 'mongoose';

const  db = async()=>{
  try {
    const db = await mongoose.connect("mongodb://mongo/battleship")
    console.log("db connected to ", db.connection.name)
  } catch (error) {
   console.log(error) 
  }


};

export default db