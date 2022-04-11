const express = require('express');
const mongoose = require('mongoose');
const app = express();
const gameRoutes = require('./routes/game');
const roundRoutes = require('./routes/round');
const keys = require('./config/keys');

mongoose
  .connect(keys.mondoURI)
  .then(() => console.log('MongoDB connected.'))
  .catch((error) => console.log(error));

app.use(require('morgan')('dev'));
app.use(express.json());
app.use(require('cors')());

app.use('/api/game', gameRoutes);
app.use('/api/round', roundRoutes);

module.exports = app;
