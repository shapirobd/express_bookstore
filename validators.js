const jsonschema = require("jsonschema");

function determineValidity(result, next) {
	if (!result.valid) {
		const errors = result.errors.map((e) => e.stack);
		return next(new ExpressError(errors, 400));
	}
}

module.exports = determineValidity;
