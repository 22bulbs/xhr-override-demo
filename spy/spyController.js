const request = require('request');
const axios = require('axios');

const spyController = {};

spyController.report = (req, res, next) => {
  console.log('request body is ', req.body);
  next();
}

spyController.reply = (req, res, next) => {
  res.json('hi from spy')
}

spyController.redirect = (req, res, next) => {
	let url = ''
  if (req.body.url[0] === '/') {
    url = req.headers.origin + req.body.url;
  } else {
    url = req.body.url;
  }
  requestConfig = {
  	url: url,
  	method: req.body.options.method,
  	headers: req.body.options.headers
  }
  if (req.body.data) {
  	  data = JSON.parse(req.body.data)
  	  requestConfig.data = data;
  }
  axios(requestConfig)
  .then(response => {
  	console.log('response is ', response.data);
  	res.json(response.data)
  })
}
module.exports = spyController;