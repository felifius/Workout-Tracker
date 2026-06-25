import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema({
    name: String,
    userEmail:{
        type:String,
        ref:"user",
    },
    exercises:[{
        exerciseId: { type: mongoose.Schema.Types.ObjectId, ref: 'exercise' },
        sets: Number,
        reps: Number,
        weight: Number,
    }],
    schedule: Date,
    status: {
        type:String,
        enum: ['Pending', 'Completed'],
        default: "Pending"
    },
    comment: String
});

export default mongoose.model("workout", workoutSchema);