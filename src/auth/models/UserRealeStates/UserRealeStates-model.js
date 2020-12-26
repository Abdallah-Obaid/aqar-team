'use strict';

const Model = require('../model');
const schema = require('./UserRealeStates-schema');

class UserRealeStates extends Model {
  constructor(schema) {
    super(schema);
  }
}

module.exports = new UserRealeStates(schema);

// require it, then make instance new Products();
// beside not doing new, use the methods directly + Singlton 