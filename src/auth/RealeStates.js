'use strict';
require('dotenv').config();
const bcrypt =  require('bcrypt');
const jwt = require('jsonwebtoken');
const { reduce } = require('lodash');
const SECRET = 'TOKEN'; // place this in your .env
// console.log('token',SECRET);
const mongoDB = require('./models/RealeStates/RealeStates-model');
// let obj={}; //db
let realeStates = {}; //exporting

// TODO For lab 11 : read this link : https://mongoosejs.com/docs/2.7.x/docs/methods-statics.html
// 1- schema.methods.authenticateBasic .. follow the demo logic.

// save the password as hashed.
// 2- Mongoose : hooks pre hook. : https://mongoosejs.com/docs/middleware.html#pre

/**
 * @param(obj)
 */

realeStates.save = async function(record){
//   let reading = await mongoDB.read(record);
  console.log('123123213123123',record);
//   if (!reading[0]) {
    // record.password  = await bcrypt.hash(record.password, 5);
    let test = await mongoDB.create(record);
    console.log('signup test',test);
    return test;
//   }
  // let addNewNote =await mongoDB.create(record);
};



realeStates.list = async function(record){
  let reading = await mongoDB.read(record);
  
  return reading;
};


realeStates.readByID =async function(record){
  console.log(reduce)
  let reading = await mongoDB.readId(record);
  return reading;
};

realeStates.find = async function(fieldName,value){
  console.log(fieldName,value,'fieldName,value');
  let reading = await mongoDB.readBy(fieldName,value);
  return reading;
}


module.exports = realeStates;


