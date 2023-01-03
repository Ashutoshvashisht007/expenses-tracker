import mongoose from 'mongoose';
const { Schema } = mongoose;

// creating schema for storing the data in the mongo db
const userSchema = new Schema(
    {
        firstname: { type: String, required: ['First Name field is empty'] },
        lastname: { type: String, required: ['Last Name field is empty'] },
        email: { type: String, required: ['Email field is empty'] },
        password: { type: String, required: ['Password field is empty'] },
    },
    { 
        timestamps: true 
    }
);

export default new mongoose.model("User", userSchema);