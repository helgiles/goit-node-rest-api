import contactsService from '../services/contactsServices.js';
import HttpError from '../helpers/HttpError.js';

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

		const result = await contactsService.updateContact(id, contact);

		if (!result) {
			throw HttpError(404);
		}
		res.status(201).json(result);
	} catch (error) {
		next(error);
	}
};
