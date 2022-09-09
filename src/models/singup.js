const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username : {
        type:String,
        required:true,
        unique: true
    },

    email : {
        type:String || Number,
        required:true,
        unique:true
    },
    password : {
        type:String,
        required:true
    }
}, {timestamps: true})


const Singup = new mongoose.model("Singup" , userSchema)


module.exports = Singup;