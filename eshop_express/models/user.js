const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required:true,
        unique:true
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    passwordHash:{
        type: String,
        required:true
    },
    street:{
        type:String,
        required:true,
    },
    apartment:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    zip:{
        type:String,
        required:true,
    },
    country:{
        type:String,
        required:true,
    },
    phone:{
        type: String,
        required:true
    },
    isAdmin:{
        type: Boolean,
        default:false
    },
    dateCreated:{
        type: Date,
        default: Date.now,
    }
})

exports.User = mongoose.model('User', userSchema)