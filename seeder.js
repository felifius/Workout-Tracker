import mongoose from "mongoose";
import {exercisesData} from "./seed/exercises.js";
import exercises from "./modules/Exercises.js";
import {connectDB} from "./db.js";

connectDB();

async function seedData(){
    try{
        const createdExercices = await exercisesSchema.insertMany(exercises);
        console.log("Exercicios importados com sucesso");
        process.exit();
    }
    catch(error){    
        console.log(error);
        process.exit();
    }
}

async function destroyData(){
    try{
        await exercisesSchema.deleteMany();
        console.log("All data deleted from exercises");
        process.exit();
    }
    catch{
        console.log(error);
        process.exit();
    }
}

if (process.argv[2] === '-d'){
    destroyData();
}else{
seedData();
}