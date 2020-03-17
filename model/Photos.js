const mongoose = require('mongoose');
const Joi = require('joi');

const Photos = new mongoose.model('Photos', new mongoose.Schema({
    cri_title:{type:String, required:true},
    author:{type:mongoose.Schema.Types.ObjectId, ref:'Authors'},
    publishedDate:Date,
    subtitle:String,
    desciption:String,
    tags:[{type:mongoose.Schema.Types.ObjectId, ref:'tags'}],
    displayPic:String,
    albums:[],
}));

exports.Photos = Photos;