'use strict';

const express = require('express');
const router = express.Router();
const users = require('./users');
const basicAuth = require('./middleware/basic-auth-middleware');
const oath = require('./middleware/oauth-middleware');
const realeStates = require('./RealeStates');
const bearerMiddleware = require('./middleware/bearer-auth-middleware');
const userRealeStates=require('./userRealeStates');

router.post('/signup',signup);
router.post('/signin',basicAuth,signin);
router.get('/users',list);
router.get('/realeStates',listRealeStates);
router.post('/saveRealeStates',bearerMiddleware,createRealeState);
router.get('/getUserRealeStates',bearerMiddleware,getUserRealeStates);
router.get('/getUserCartRealeStates',bearerMiddleware,getUserCartRealeStates);
router.post('/saveCartRealesStates',bearerMiddleware,AddUserCartRealeStates)
router.get('/oauth', oath, (req, res)=> {
  res.status(200).send(req.token);
});

/**
 * 
 * @param {obj} req 
 * @param {obj} res 
 * @param {function} next 
 */
function signup(req, res, next) {
  //sign up route if we have the user, return failure, else return generated token.
  let user = req.body;
  console.log(user);
  users.save(user).then(result => {
    // generate a token and return it.
    let token = users.generateTokenUp(result);
    console.log('generated token',token);
    // req.token=token;
    res.cookie(token);
    res.status(200).send(token);
  }).catch(err=> {
    console.log(err);
    res.status(403).send('Invalid Signup! email is taken');
  });
}

/**
 * @param {obj} req 
 * @param {obj} res 
 * @param {function} next 
 */
// check this username if the password submitted matches the encrypted one we have saved in our db
function signin(req, res, next) {
  res.cookie(req.token);
  res.status(200).send(req.token); // return token 4
}

/**
 * @param {obj} req 
 * @param {obj} res 
 * @param {function} next 
 */
function list(req, res, next) {
  users.list(undefined).then(result => {
    console.log('prove of life');
    console.log(result);
    res.status(200).send(result);
  }).catch(err=> {
    console.log('ERR!!');
    res.status(403).send('Listing error');
  });
}

function listRealeStates(req, res, next){
  realeStates.list(undefined).then(result => {
    console.log('prove of life');
    console.log(result);
    res.status(200).send(result);
  }).catch(err=> {
    console.log(err);
    res.status(403).send('Listing error');
  });
}

function createRealeState(req, res, next){
  let realeStatesModel = req.body;
  console.log( req.user,' req.user');
  realeStatesModel.ownerId = req.user._id;
  realeStatesModel.creationDate = Date.now();
  realeStatesModel.ownerName = req.user.username;
  console.log(realeStatesModel);
  if(Number(req.user.points) >= 900){
    realeStatesModel.specialRealeStates = true;
    req.user.points = 0;
  }else{
    req.user.points =Number(req.user.points) + 100;
  }
  realeStates.save(realeStatesModel).then(result =>{
    users.update(req.user._id,req.user);
    console.log(result);
    res.status(200).send(result);
  }).catch(err=> {
    console.log(err);
    res.status(403).send(err);
  });
}

function getUserRealeStates(req, res, next){
  console.log( req.user,' req.user');
  let id = req.user._id;
  console.log(id)
  realeStates.find("ownerId",id).then(result =>{
    console.log(result);
    res.status(200).send(result);
  }).catch(err=> {
    console.log(err);
    res.status(403).send(err);
  });
}

function getUserCartRealeStates(req,res,next){
  console.log( req.user,' req.user');
  let id = req.user._id;
  console.log(id)
  userRealeStates.find(id).then( async (result) =>{
    var arr = [];
    console.log(result);
    for(let i = 0 ; i < result.length; i++){
      let rec = await realeStates.readByID(result[i].realeStateID)
      arr.push(rec)
    }
    res.status(200).send(arr);
  }).catch(err=> {
    console.log(err);
    res.status(403).send(err);
  });
}

function AddUserCartRealeStates(req,res,next){
  let obj = req.body;
  obj.userID = req.user._id;
  obj.creationDate= Date.now();
  userRealeStates.save(obj).then(result =>{
    console.log(result);
    res.status(200).send(result);
  }).catch(err=> {
    console.log(err);
    res.status(403).send(err);
  });
}

module.exports = router;

