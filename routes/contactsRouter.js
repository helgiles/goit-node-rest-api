import express from 'express';
import {
	getAllContacts,
	getOneContact,
	createContact,
	updateContact,
	updateFavoriteContact,
	deleteContact,
} from '../controllers/contactsControllers.js';
import {
	createContactSchema,
	updateContactSchema,
	updateFavoriteSchema,
} from '../schemas/contactsSchemas.js';
import { validateBody } from '../helpers/validateBody.js';
import { isValidId } from '../helpers/isValidId.js';

const jsonParser = express.json();

const contactsRouter = express.Router();

contactsRouter.get('/', getAllContacts);

contactsRouter.get('/:id', isValidId, getOneContact);

contactsRouter.post(
	'/',
	jsonParser,
	validateBody(createContactSchema),
	createContact
);

contactsRouter.put(
	'/:id',
	isValidId,
	jsonParser,
	validateBody(updateContactSchema),
	updateContact
);

contactsRouter.patch(
	'/:id/favorite',
	isValidId,
	jsonParser,
	validateBody(updateFavoriteSchema),
	updateFavoriteContact
);

contactsRouter.delete('/:id', isValidId, deleteContact);

export default contactsRouter;
