const express = require('express');
const methodOverride = require('method-override');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const routes = require('../api/routes/v1');
const { logs } = require('./vars');
const jwt = require('./passport');
//const error = require('../api/middlewares/error');

/**
* Express instance
* @public
*/
const app = express();
app.use(express.json());

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// enable authentication
app.use(passport.initialize());
passport.use('jwt', jwt);
//passport.use('facebook', strategies.facebook);
//passport.use('google', strategies.google);

// mount api v1 routes
app.use('/v1', routes);



module.exports = app;
