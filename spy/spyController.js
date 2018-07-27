const request = require('request');

const spyController = {};

spyController.report = (req, res, next) => {
  console.log(req.body);
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
  request(url, { json: true }, (err, resp, body) => {
    if (err) return console.log(err);
    console.log(body);
    res.json(body);
  })
}
module.exports = spyController;