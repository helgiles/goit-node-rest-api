import { User } from '../models/user.js';
import HttpError from '../helpers/HttpError.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const registerUser = async (req, res, next) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (user !== null) {
			throw HttpError(409, `User with email ${email} is already registered`);
		}

		const passwordHash = await bcrypt.hash(password, 10);

		const newUser = await User.create({
			email: email,
			password: passwordHash,
		});

		res.status(201).json({
			user: {
				email: newUser.email,
				subscription: newUser.subscription,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const loginUser = async (req, res, next) => {
	const { email, password } = req.body;
	const secretKey = process.env.JWT_SECRET;

	try {
		const user = await User.findOne({ email });

		if (user === null) {
			throw HttpError(401, `Email or password is incorrect`);
		}

		const isMatch = await bcrypt.compare(password, user.password);

		if (isMatch === false) {
			throw HttpError(401, `Email or password is incorrect`);
		}

		const token = jwt.sign({ id: user._id }, secretKey, {
			expiresIn: '3h',
		});

		await User.findByIdAndUpdate(user._id, { token });

		res.send({
			token: token,
			user: {
				email: user.email,
				subscription: user.subscription,
			},
		});
	} catch (error) {
		next(error);
	}
};

export const getCurrent = async (req, res) => {
	const { email, subscription } = req.user;

	res.json({
		email,
		subscription,
	});
};

export const updateSubscription = async (req, res, next) => {
	const { id } = req.params;
	const { subscription } = req.body;
	console.log(req.body);

	try {
		if (!subscription) {
			throw HttpError(400, 'Subscription is required');
		}

		const result = await User.findOneAndUpdate(
			{ _id: id },
			{ subscription },
			{
				new: true,
			}
		);

		if (!result) {
			throw HttpError(404);
		}

		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};

export const logout = async (req, res, next) => {
	const { _id } = req.user;
	try {
		await User.findByIdAndUpdate(_id, { token: null });

		res.status(204).end();
	} catch (error) {
		next(error);
	}
};
