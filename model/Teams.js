const mongoose = require('mongoose');
const Joi = require('joi');

const Teams = new mongoose.model('Teams', new mongoose.Schema({
    name:{type:String, required:true},
    subname:{type:String, required:true},
    desc:{type:String},
    image:{type:String},
    odirank:{type:String},
    testrank:{type:String},
    twtrank:{type:String}
}));

exports.Teams = Teams;