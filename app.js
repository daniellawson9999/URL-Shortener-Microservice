if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}
const express = require('express');
//const morgan = require('morgan');
const mongoose = require('mongoose');
const errorHandler = require('errorhandler');
const path = require('path');


const port = process.env.PORT || 3000;

//get reouters or custom middleware
const main = require('./routes/main');
const ignoreFavicon = require('./routes/favicon')

//set up mongo
mongoose.Promise = global.Promise;
const mongoURL = process.env.MONGODB_URL;
//console.log(mongoURL);
mongoose.connect(mongoURL);


//create app
const app = express();

//set up pug
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');

//set middleware
//app.use(morgan('dev'));
app.use(ignoreFavicon);
//set routes here (using middleware)
//todo
app.use('/',main);


app.use(errorHandler());
app.listen(port);
