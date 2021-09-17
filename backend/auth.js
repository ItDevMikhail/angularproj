import mongoose from "mongoose";

const Auth = new mongoose.Schema({
    login: {type: String, required: true},
    email: {type: String},
    password: {type: String, required: true}, 
})

export default mongoose.model('Auth', Auth)