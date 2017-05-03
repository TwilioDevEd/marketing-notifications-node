'use strict';

const mongoose = require('mongoose');
const cfg = require('../config');


if (!cfg.mongoUrl) {
  throw new Error('MONGO_URL env variable not set.');
}

const connect = () => {
  return mongoose.connect(cfg.mongoUrl);
};

const disconnect = () => {
  return mongoose.connection.close();
};

exports.connect = connect;
exports.disconnect = disconnect;
mongoose.Promise = Promise;
