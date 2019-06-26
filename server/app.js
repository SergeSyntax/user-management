const error = require('./middleware/error');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
// const session = require('express-session');
const cors = require('cors');
require('express-async-errors');

const users = require('./routes/users');
const tasks = require('./routes/tasks');
const posts = require('./routes/posts');

const app = express();
require('./configs/database');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(cors());
app.options('*', cors());
// app.use(session({ secret: 'mysessionkey' }));

app.use('/users', users);
app.use('/tasks', tasks);
app.use('/posts', posts);
app.get('*', function(req, res) {
  res.redirect('/users');
});
app.use(error);

module.exports = app;
