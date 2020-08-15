const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');

const db = 'mongodb://localhost:27017/user-management';

mongoose
  .connect(db, {
    // useNewUrlParser: true,
    // useCreateIndex: true
    useUnifiedTopology: true,
  })
  .then(() => winston.info(`Connected to ${db}`));
