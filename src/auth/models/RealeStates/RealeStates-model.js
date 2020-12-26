'use strict';

const Model = require('../model');
const schema = require('./RealeStates-schema');

class RealeStates extends Model {
  constructor(schema) {
    super(schema);
  }
}

module.exports = new RealeStates(schema);

// require it, then make instance new Categories();
// beside not doing new, use the methods directly + Singlton 