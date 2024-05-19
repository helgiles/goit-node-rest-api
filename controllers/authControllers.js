import { User } from '../models/user.js';
import HttpError from '../helpers/HttpError.js';
import bcrypt from 'bcrypt';

export const registerUser = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });

		if (user !== null) {
			throw HttpError(409, `User with email ${email} is already registered`);
		}

		const passwordHash = await bcrypt.hash(password, 10);

		await User.create({
			email: email,
			password: passwordHash,
		});

		res.status(201).json({ message: `Registration for ${email} successfully` });
	} catch (error) {
		console.log(error);
		next(error);
	}
};

export const loginUser = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });

		if (user === null) {
			console.log('Email');
			throw HttpError(401, `Email or password is incorrect`);
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (isMatch === false) {
			console.log('Password');
			throw HttpError(401, `Email or password is incorrect`);
		}

		res.send({ token: 'TOKEN' });
	} catch (error) {
		next(error);
	}
};
