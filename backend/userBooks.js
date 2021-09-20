import mongoose from "mongoose";

const userBooks = new mongoose.Schema({
    login: {type: String},
    books: {type: String}, 
    name: {type: String},
    description: {type: String}, 
})

export default mongoose.model('userBooks', userBooks)