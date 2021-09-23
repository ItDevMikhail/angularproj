import mongoose from "mongoose";

const userBooks = new mongoose.Schema({
    userName: {type: String},
    books: {type: String}, 
    bookId: {type: String},
})

export default mongoose.model('userBooks', userBooks)