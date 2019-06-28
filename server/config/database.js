const mongoose = require('mongoose');
const winston = require('winston');

mongoose
  .connect('mongodb://localhost/user-management', { useNewUrlParser: true, useCreateIndex: true })
  .then(() => winston.info('Connected to MongoDB'))
