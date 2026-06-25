import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:String,
    password:String,
    email:String
}
);

export default mongoose.model("user", userSchema);