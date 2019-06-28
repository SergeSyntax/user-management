const express = require('express');
const users = require('./users');
const tasks = require('./tasks');
const posts = require('./posts');
const error = require('../middleware/error');
const cors = require('cors');

module.exports = function(app) {
  app.use(express.json());
  app.use(cors());
  app.use('/users', users);
  app.use('/tasks', tasks);
  app.use('/posts', posts);
  app.get('*', function(req, res) {
    res.redirect('/users');
  });
  app.use(error);
};
