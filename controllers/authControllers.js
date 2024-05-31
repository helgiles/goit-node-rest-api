import { User } from '../models/user.js';
import HttpError from '../helpers/HttpError.js';
import Jimp from 'jimp';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import gravatar from 'gravatar';
import path from 'node:path';
import * as fs from 'node:fs/promises';

export const registerUser = async (req, res, next) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (user !== null) {
			throw HttpError(409, `User with email ${email} is already registered`);
		}

		const passwordHash = await bcrypt.hash(password, 10);
		const avatarUrl = gravatar.url(email);
		console.log(avatarUrl);

		const newUser = await User.create({
			email: email,
			password: passwordHash,
			avatarURL: avatarUrl,
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

	try {
		if (!subscription) {
			throw HttpError(400, 'Subscription is required');
		}

		const result = await User.findOneAndUpdate(
			{ _id: id },
			{ subscription },
			{ new: true }
		);

		if (!result) {
			throw HttpError(404);
		}

		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};

export const updateAvatar = async (req, res, next) => {
	const id = req.user.id;

	if (!req.file || !req.file.filename) {
		next(HttpError(400, 'Avatar file must be added'));
	}

	const file = req.file.filename;
	const tmpPath = req.file.path;

	try {
		const newPath = path.resolve('public', 'avatars', file);

		const image = await Jimp.read(tmpPath);
		await image.resize(250, 250);
		await image.writeAsync(newPath);
		await fs.unlink(tmpPath);

		const avatarURL = path.join('avatars', file);

		await User.findByIdAndUpdate(id, { avatarURL }, { new: true });

		res.send({ avatarURL });
	} catch (error) {
		next(error);
	}
};

export const logout = async (req, res, next) => {
	const id = req.user.id;
	try {
		await User.findByIdAndUpdate(id, { token: null });

		res.status(204).end();
	} catch (error) {
		next(error);
	}
};
