const mongoose = require('mongoose');
const Country = mongoose.model('countries', new mongoose.Schema({
    name:{type:String, required:true},
    subname:String,
    aboutUs:String,
    displayPic:String,
}));

exports.Countries = Country;