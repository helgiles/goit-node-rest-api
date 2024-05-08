import contactsService from '../services/contactsServices.js';
import HttpError from '../helpers/HttpError.js';
import {
	createContactSchema,
	updateContactSchema,
} from '../schemas/contactsSchemas.js';

export const getAllContacts = async (req, res) => {
	const result = await contactsService.listContacts();
	res.json(result);
};

export const getOneContact = async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await contactsService.getContactById(id);

		if (!result) {
			throw HttpError(404);
		}
		res.json(result);
	} catch (error) {
		next(error);
	}
};

export const deleteContact = async (req, res, next) => {
	try {
		const { id } = req.params;
		const result = await contactsService.removeContact(id);

		if (!result) {
			throw HttpError(404);
		}

		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
};

export const createContact = async (req, res, next) => {
	try {
		const contact = req.body;
		const { error } = createContactSchema.validate(contact);

		if (error) {
			throw HttpError(400, error.message);
		}

		const result = await contactsService.addContact(contact);
		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
};

export const updateContact = async (req, res, next) => {
	try {
		const { id } = req.params;
		const contact = req.body;
		const { error } = updateContactSchema.validate(contact);

		if (error) {
			throw HttpError(400, error.message);
		}

		const result = await contactsService.updateContact(id, contact);

		if (!result) {
			throw HttpError(404);
		}
		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
};
