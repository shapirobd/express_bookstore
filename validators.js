const jsonschema = require("jsonschema");
const bookSchema = require("./schemas/bookSchema.json");
const ExpressError = require("./expressError");

function continueIfValid(req, next) {
	const result = jsonschema.validate(req.body, bookSchema);
	if (!result.valid) {
		const errors = result.errors.map((e) => e.stack);
		return next(new ExpressError(errors, 400));
	}
}

module.exports = continueIfValid;
