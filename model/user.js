const mongoose = require('mongoose');
const Joi = require('joi');
const User = new mongoose.model('user', new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minlength:5
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    displayPic:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        required:true
    },
    DOB:Date
}));

exports.User = User;