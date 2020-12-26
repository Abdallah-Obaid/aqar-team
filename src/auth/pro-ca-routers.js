'use strict';

const express = require('express');
const router = express.Router();
const bearerMiddleware = require('./middleware/bearer-auth-middleware');
const permissions=require('./middleware/authorize');

// require categories model  , use it in my router fnts.
// Old way before refactoring ====================================>
// const products = require('../models/products/products-model');
// const categories = require(`../models/categories/categories-model`);

/* TODO : 
    move this to middleware folder
    create a folder for each model+schema : in this case food folder and books folder
    figure out a way to require the model file in a dynamic way instead of requiring them one by one.
*/

// New daynamic way after refactoring ============================>
// How are we going to get the right model? (acts like a middleware)

/**
 * 
 * @param {opject} req 
 * @param {opject} res 
 * @param {function} next 
 */
function getModel(req, res, next) {
  let model = req.params.model; // this will be food, books, whatever is after api/v1/
  console.log(model);  
  const modeler = require(`./models/${model}/${model}-model`);
  console.log(modeler);
  switch(model) {
  case 'products':
    req.model = modeler;
    next();
    return;
  case 'categories':
    req.model = modeler;
    next();
    return;
  default:
    next('Invalid Model');
    return;
  }
}

// Define the parameter for run the getModel middleware ============>
router.param('model', getModel);
router.get('/:model',bearerMiddleware,permissions('read'), readCategories);
router.get('/:model/:_id',bearerMiddleware,permissions('read'), readCategories);
router.post('/:model',bearerMiddleware,permissions('create'), createCategories);
router.delete('/:model/:_id',bearerMiddleware,permissions('delete'), deleteCategories);
router.put('/:model/:_id',bearerMiddleware,permissions('update'), updateCategories);

/**
 * 
 * @param {opject} req 
 * @param {opject} res 
 * @param {function} next 
 */
function readCategories(req, res, next) {
  // CRUD operation
  req.model.readId(req.params._id)
    .then(data => {
      res.status(200).json(data);
    })
    .catch(next);
}

/**
 * 
 * @param {opject} req 
 * @param {opject} res 
 * @param {function} next 
 */
function createCategories(req,res, next ) {
  // CRUD operation
  req.model.create(req.body)
    .then(data => {
      res.status(201).json(data); // {_id: monogid, }
    }).catch(next);
}

/**
 * 
 * @param {opject} req 
 * @param {opject} res 
 * @param {function} next 
 */
function deleteCategories(req,res, next) {
  // CRUD operation
  console.log('----->>>> testing delete route ',req.params._id);
  req.model.delete(req.params._id)
    .then(data => {
      res.status(200).json(data);
    }).catch(next);
}

/**
 * 
 * @param {opject} req 
 * @param {opject} res 
 * @param {function} next 
 */
function updateCategories(req,res, next) {
  // CRUD operation
  console.log('----->>>> testing update route ',req.params._id,req.body);
  req.model.update(req.params._id,req.body)
    .then(data => {
      res.status(200).json(data);
    }).catch(next);
}

module.exports = router;