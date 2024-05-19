import { Contact } from '../models/contact.js';
import HttpError from '../helpers/HttpError.js';

export const getAllContacts = async (req, res) => {
	try {
		const result = await Contact.find({}, '-createdAt -updatedAt');
		if (!result) {
			throw HttpError(404);
		}
		res.json(result);
	} catch (error) {
		next(error);
	}
};

export const getOneContact = async (req, res, next) => {
	const { id } = req.params;

	try {
		const result = await Contact.findById(id);
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

	try {
		const result = await Contact.create(contact);

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

		const result = await Contact.findByIdAndUpdate(id, contactUpdates, {
			new: true,
		});

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

		const result = await Contact.findByIdAndUpdate(id, contactUpdates, {
			new: true,
		});

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
		const result = await Contact.findByIdAndDelete(id);

		if (!result) {
			throw HttpError(404);
		}

		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
};
