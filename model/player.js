const mongoose = require('mongoose');
const Joi = require('joi');

const Player = new mongoose.model('player', new mongoose.Schema({
    name:{type:String, required:true},
    subname:String,
    DOB:Date,
    height:Number,
    country:mongoose.Schema.Types.ObjectId,
    aboutUs:String,
    role:String,
    battingStyle:String,
    bowlingStyle:String,
    displayPic:String,
    teams:[]
}));

exports.Player = Player;