import { Contact } from '../models/contact.js';
import HttpError from '../helpers/HttpError.js';

export const getAllContacts = async (req, res, next) => {
	const { _id: owner } = req.user;
	const { page = 1, limit = 20, favorite } = req.query;
	const skip = (page - 1) * limit;

	const filter = { owner };
	if (favorite !== undefined) {
		filter.favorite = favorite === 'true';
	}

	try {
		const total = await Contact.countDocuments(filter);
		const result = await Contact.find(filter, '-createdAt -updatedAt', {
			skip,
			limit: parseInt(limit, 10),
		}).populate('owner', '_id subscription');

		if (!result) {
			throw HttpError(404);
		}

		res.json({
			total,
			page: parseInt(page, 10),
			perPage: parseInt(limit, 10),
			contacts: result,
		});
	} catch (error) {
		next(error);
	}
};

export const getOneContact = async (req, res, next) => {
	const { id } = req.params;

	try {
		const result = await Contact.findOne(
			{ _id: id, owner: req.user.id },
			'-createdAt -updatedAt'
		);
		if (!result) {
			throw HttpError(404);
		}
		res.json(result);
	} catch (error) {
		next(error);
	}
};

export const createContact = async (req, res, next) => {
	const contact = req.body;
	const { _id: owner } = req.user;

	try {
		const result = await Contact.create({ ...contact, owner });

		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
};

export const updateContact = async (req, res, next) => {
	const { id } = req.params;

	try {
		const contactUpdates = req.body;

		if (Object.keys(contactUpdates).length === 0) {
			throw HttpError(400, 'At least one field must be provided for update');
		}

		const result = await Contact.findOneAndUpdate(
			{ _id: id, owner: req.user.id },
			contactUpdates,
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

export const updateFavoriteContact = async (req, res, next) => {
	const { id } = req.params;

	try {
		const contactUpdates = req.body;

		const result = await Contact.findOneAndUpdate(
			{ _id: id, owner: req.user.id },
			contactUpdates,
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

export const deleteContact = async (req, res, next) => {
	const { id } = req.params;

	try {
		const result = await Contact.findOneAndDelete({
			_id: id,
			owner: req.user.id,
		});

		if (!result) {
			throw HttpError(404);
		}

		res.status(204).json(result);
	} catch (error) {
		next(error);
	}
};
