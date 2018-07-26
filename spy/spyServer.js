//this is the server that the spy script redirects to, run with npm run spy

const express = require('express');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');

const spyController = require('./spyController');

const app = express();

app.use(bodyparser.json());
app.use(cookieParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/report', 
	spyController.report
);


console.log('spy running on port 9999');
app.listen(9999);


