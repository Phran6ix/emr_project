const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoSanitize = require('mongo-sanitize');
const Home = require('./src/controllers/home.controller');
const ErrorHandler = require('./src/exceptions/global.exception');
const version1 = require('./src/versions/version_1');

const app = express();

app.use(cors());
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});
app.use(morgan('dev'));

app.use(bodyParser.json());

app.get('/', Home.home);

app.use(version1);

app.use('*', Home.undefinedRoutes);

app.use(ErrorHandler);

module.exports = app;
