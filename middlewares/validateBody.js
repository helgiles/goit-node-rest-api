import HttpError from '../helpers/HttpError.js';

export const validateBody = schema => {
	const func = (req, _, next) => {
		const { error } = schema.validate(req.body, { abortEarly: false });

		if (typeof error !== 'undefined') {
			next(
				HttpError(400, error.details.map(error => error.message).join(', '))
			);
		}
		next();
	};

	return func;
};
