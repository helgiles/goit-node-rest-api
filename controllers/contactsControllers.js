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
		const contactUpdates = req.body;

		if (Object.keys(contactUpdates).length === 0) {
			throw HttpError(400, 'At least one field must be provided for update');
		}

		const existingContact = await contactsService.getContactById(id);

		if (!existingContact) {
			throw HttpError(404);
		}

		const updatedContact = Object.assign({}, existingContact, contactUpdates);

		const result = await contactsService.updateContact(id, updatedContact);

		res.status(200).json(result);
	} catch (error) {
		next(error);
	}
};
