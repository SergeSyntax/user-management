const mongoose = require('mongoose');
const winston = require('winston');
const config = require('config');

mongoose
  .connect(config.get("database"), {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => winston.info('Connected to MongoDB'));
