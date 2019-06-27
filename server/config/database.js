const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost/user-management', { useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(() => console.error('Failed connecting to MongoDB'));
