const users = require('./routes/users');
const tasks = require('./routes/tasks');
const posts = require('./routes/posts');
const error = require('./middleware/error');
const express = require('express');
const app = express();

require('./config/database');

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'OPTIONS, GET, POST, PUT, PATCH, DELETE'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
app.use('/users', users);
app.use('/tasks', tasks);
app.use('/posts', posts);
app.get('*', function(req, res) {
  res.redirect('/users');
});
app.use(error);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Listening on port ${port}...`));
