const winston = require('winston');
const express = require('express');
const app = express();

require('./config/logger')();
require('./config/database')();
require('./routes/')(app);

const port = process.env.PORT || 8000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));
