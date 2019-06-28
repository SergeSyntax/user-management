const express = require('express');
const winston = require('winston');
const morgan = require('morgan');
const users = require('./users');
const tasks = require('./tasks');
const posts = require('./posts');
const error = require('../middleware/error');
const cors = require('cors');

module.exports = function(app) {
  app.use(express.json());
  app.use(cors());
  if (app.get('env') === 'development')
    winston.info('Morgan enabled') && app.use(morgan('dev'));
  app.use('/users', users);
  app.use('/tasks', tasks);
  app.use('/posts', posts);
  app.get('*', function(req, res) {
    res.redirect('/users');
  });
  app.use(error);
};
