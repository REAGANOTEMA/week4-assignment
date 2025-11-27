// Week 4 Assignment Server
// Author: Reagan Otema

const express = require('express');
const app = express();
const invRoute = require('./routes/invRoute');
// other requires...

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// session, flash, static, view engine, etc.

// use routes
app.use('/inv', invRoute);

// you may have other routes e.g. app.use('/', indexRoute);
