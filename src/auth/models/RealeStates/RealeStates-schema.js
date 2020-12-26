'use strict';

const mongoose = require('mongoose');

const realeStates = mongoose.Schema({
  name : {type: String, required: true},
  shortDescription: {type: String, required: true},
  specialRealeStates: {type: Boolean},
  creationDate:{type:Date},
  type:{type:String,required:true},
  price:{type: Number,required:true},
  RentOrSell:{type: String,required:true},
  location:{type:String},
  ownerName:{type:String},
  phone:{type:String,required:true},
  longDescription:{type:String},
  imgUrl:{type:String},
  imgUrls:{type:String},
  TheNearestLocation:{type:String},
  ownerId:{type:String}
  });

module.exports = mongoose.model('realeStates', realeStates);
// mongo shell CLI : categoriess collection