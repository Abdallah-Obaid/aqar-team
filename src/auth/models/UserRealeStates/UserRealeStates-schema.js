'use strict';

const mongoose = require('mongoose');

const UserRealeStates = mongoose.Schema({
  userID : {type: String, required: true},
  realeStateID : {type: String, required: true},
  creationDate : {type:Date}
});

module.exports = mongoose.model('UserRealeStates', UserRealeStates);
// mongo shell CLI : products collection