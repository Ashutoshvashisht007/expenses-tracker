import mongoose from 'mongoose';
const { Schema } = mongoose;

// creating schema for storing the data in the mongo db
const transactionSchema = new Schema({
    amount: Number,
    description: String,
    user_id: mongoose.Types.ObjectId,
    date: {type: Date,default: new Date()},
    createdAt: {type: Date,default: Date.now}, // when was created
});

export default new mongoose.model("Transaction",transactionSchema);