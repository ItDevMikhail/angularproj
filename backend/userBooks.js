import mongoose from "mongoose";

const userBooks = new mongoose.Schema({
    login: {type: String, required: true},
    name: {type: String, required: true},
    description: {type: String, required: true}, 
})

export default mongoose.model('userBooks', userBooks)