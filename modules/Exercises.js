import mongoose from "mongoose";

const exercisesSchema = new mongoose.Schema({
    name: String,
    description: String,
    category: String,
    muscleGroup: String,
});

export default mongoose.model('exercise', exercisesSchema, 'exercises');