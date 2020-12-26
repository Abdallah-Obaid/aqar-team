'use strict';

const mongoose = require('mongoose');
const server = require('./src/server');
require('dotenv').config();
const MONGODB_URL = "mongodb://aaaa:aaaa@cluster0-shard-00-00.0igfj.mongodb.net:27017,cluster0-shard-00-01.0igfj.mongodb.net:27017,cluster0-shard-00-02.0igfj.mongodb.net:27017/aaaa?ssl=true&replicaSet=atlas-56dqcx-shard-0&authSource=admin&retryWrites=true&w=majority";
const mongooseOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
};

mongoose.connect(MONGODB_URL, mongooseOptions).then(()=>console.log('connect'));
server.start();

