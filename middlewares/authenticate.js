import HttpError from '../helpers/HttpError.js';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

const secretKey = process.env.JWT_SECRET;

export const authenticate = async (req, res, next) => {
	const { authorization = '' } = req.headers;
	const [bearer, token] = authorization.split(' ', 2);

	if (bearer !== 'Bearer') {
		next(HttpError(401, `Invalid token тут`));
	}

	try {
		const { id } = jwt.verify(token, secretKey);
		const user = await User.findById(id);

		if (!user || !user.token || user.token !== token) {
			next(HttpError(401, `Invalid token`));
		}

		req.user = user;
		next();
	} catch {
		next(HttpError(401, `Invalid token`));
	}
};
