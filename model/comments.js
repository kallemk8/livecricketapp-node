const mongoose = require('mongoose');
const Joi = require('joi');

const Comments = new mongoose.model('Comments', new mongoose.Schema({
    comment:{type:String, required:true},
    author:{type:mongoose.Schema.Types.ObjectId, ref:'user'},
    publishedDate:Date,
    postID:{type:mongoose.Schema.Types.ObjectId, ref:'CriNews'},
    parentcommentid:{type:mongoose.Schema.Types.ObjectId, ref:'Comments'},
}));

exports.Comments = Comments;