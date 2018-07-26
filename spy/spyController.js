const spyController = {};

spyController.report = (req, res, next) => {
		res.json('hi from spy');
		next();
	}

module.exports = spyController;