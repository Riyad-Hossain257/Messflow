const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
require('dotenv').config({ path: `${__dirname}/config.env` });
require('./app/Database/Connection/Connection');
const passport = require('passport');
const { mongo, Mongoose } = require('mongoose');

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(passport.initialize());
require('./app/Passport')(passport);

app.use('/api', require('./app/routers/login&regRoutes'));
app.use('/api', require('./app/routers/manager.routes'));
app.use('/api', require('./app/routers/common.routes'));
app.use('/api/poll', require('./app/routers/poll.routes'));

const port = process.env.port || 4000;
app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
