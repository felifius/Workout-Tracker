import mongoose from "mongoose";
import dotenv from 'dotenv';


//func conecta com o banco de dados MONGODB
export const connectDB = async ()=>{
    try{
    dotenv.config();
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Conectado ao MongoDB");
    }
    catch(error){
        console.log(`Erro ao conectar: ${error}`);
    }
};