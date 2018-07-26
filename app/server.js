//this is the server used to serve our app on port 3000, run with npm start

const express = require('express');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');



const app = express();

app.use(bodyparser.json());
app.use(cookieParser());
app.use(express.static(__dirname + '/client'));

app.get('/api',
	(req, res, next) => {
		res.json('hi from api');
		next();
	}
	)


console.log('app running on port 3000');
app.listen(3000);