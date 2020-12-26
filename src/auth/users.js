'use strict';
require('dotenv').config();
const bcrypt =  require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = 'TOKEN'; // place this in your .env
// console.log('token',SECRET);
const mongoDB = require('./models/users/users-model');
// let obj={}; //db
let users = {}; //exporting
let roles = {
  user: ['read'],
  writers: ['read', 'create'],
  editor: ['read', 'update', 'create'],
  Administrators : ['read', 'update', 'create', 'delete'],
};
// TODO For lab 11 : read this link : https://mongoosejs.com/docs/2.7.x/docs/methods-statics.html
// 1- schema.methods.authenticateBasic .. follow the demo logic.

// save the password as hashed.
// 2- Mongoose : hooks pre hook. : https://mongoosejs.com/docs/middleware.html#pre

/**
 * @param(obj)
 */
users.save = async function(record){
  let reading = await mongoDB.read(record.username);
  console.log('123123213123123',reading);
  if (!reading[0]) {
    record.password  = await bcrypt.hash(record.password, 5);
    let test = await mongoDB.create(record);
    console.log('signup test',test);
    return record;
  }
  // let addNewNote =await mongoDB.create(record);
  return Promise.reject();
};

/**
 * @param(string)
 */
// compare the password with the encrypted one
users.authenticateBasic = async function(username, password) {
  // let reading = await mongoDB.read(record.username);
  // console.log(password)
  // console.log('testotestotestotestotestotestotestotestotestotesto',username);
  let reading = await mongoDB.read(username);
  // console.log('testotestotestotestotestotestotestotestotestotesto',reading[0]);
  // console.log('testotestotestotestotestotestotestotestotestotesto',reading[0].password);
  // console.log('hello');
  let valid = await bcrypt.compare(password, reading[0].password);
  console.log(valid);
  return valid ? username : Promise.reject();
};

/**
 * @param(obj)
 */
users.generateTokenUp =  function (user) {
  // ,{expiresIn:900}
  console.log('sadasdsadasdasd1',user);
  console.log('sadasdsadasdasd2',user.username);
  console.log('sadasdsadasdasd3',jwt);
  let token = jwt.sign({user: user , capabilities: roles[user.role]},SECRET,{expiresIn:900000}  );
  console.log('tokentokentokentokentoken',token);
  console.log('##########################################################');
  return token;
};

users.generateTokenIn =  async function (user) {
  let reading =  await mongoDB.read(user);
  console.log('TokengenerateTokengenerateTokengenerate',reading[0].role);
  let userName =  reading;
  let capabilities = roles[reading[0].role] || user.role;
  // ,{expiresIn:900}
  let token = await jwt.sign({user: userName , capabilities: capabilities},SECRET,{expiresIn:900}  );
  console.log('tokentokentokentokentoken',token);
  console.log('##########################################################');
  return token;
};

users.list = async function(record){
  let reading = await mongoDB.read(record);
  
  return reading;
};

users.verifyToken = function (token) {
  return  jwt.verify(token, SECRET,async function(err, decoded){
    console.log(token);
    if (err) {
      console.log('err>>> ', err);
      return Promise.reject(err);
    }
    
    let userModel = decoded.user; // decoded.username
    var reading = await mongoDB.read(userModel.username);
    console.log('decoded >>>> ',reading); // {username: usernameValue, ...}
    // console.log('');
    // console.log(reading);
    if (reading[0]) {
      return Promise.resolve(reading[0]);
    } 
    return Promise.reject();
  });
};
users.update = async function (_id,record) {
  var reading = await mongoDB.update(_id,record);
  return reading;
};

module.exports = users;


