const mongoose = require('mongoose');
const Joi = require('joi');

const Videos = new mongoose.model('Videos', new mongoose.Schema({
    cri_title:{type:String, required:true},
    author:{type:mongoose.Schema.Types.ObjectId, ref:'Authors'},
    publishedDate:Date,
    subtitle:String,
    desciption:String,
    tags:[{type:mongoose.Schema.Types.ObjectId, ref:'tags'}],
    displayPic:String,
    videoUrl:String,
    youtubeID:String
}));

exports.Videos = Videos;