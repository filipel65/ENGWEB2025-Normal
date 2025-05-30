var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
const mongoose = require("mongoose");
const cors = require("cors");

const router = require("./routes/index");
const countries_router = require("./routes/countries");
const inter_router = require("./routes/interpretes");

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended:false }));
app.use(express.static(path.join(__dirname, 'public')));

// == ALTERAR para definir root
app.use("/edicoes", router);
app.use("/paises", countries_router);
app.use("/interpretes", inter_router);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

// === ALTERAR para definir nome da database
mongoose.connect("mongodb://localhost:27017/eurovisao")
.then(() => console.log("connected to mongoDB."))
.catch(err => console.error(err));

module.exports = app;