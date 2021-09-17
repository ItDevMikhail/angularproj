import mongoose from "mongoose";

const Books = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true}, 
})

export default mongoose.model('Books', Books)