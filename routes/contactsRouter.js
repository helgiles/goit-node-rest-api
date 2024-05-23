import express from 'express';
import {
	createContactSchema,
	updateContactSchema,
	updateFavoriteSchema,
} from '../schemas/contactsSchemas.js';
import { jsonParser } from '../middlewares/jsonParser.js';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import {
	getAllContacts,
	getOneContact,
	createContact,
	updateContact,
	updateFavoriteContact,
	deleteContact,
} from '../controllers/contactsControllers.js';

const contactsRouter = express.Router();

contactsRouter.get('/', authenticate, getAllContacts);

contactsRouter.get('/:id', authenticate, isValidId, getOneContact);

contactsRouter.post(
	'/',
	jsonParser,
	authenticate,
	validateBody(createContactSchema),
	createContact
);

contactsRouter.put(
	'/:id',
	isValidId,
	jsonParser,
	authenticate,
	validateBody(updateContactSchema),
	updateContact
);

contactsRouter.patch(
	'/:id/favorite',
	isValidId,
	jsonParser,
	authenticate,
	validateBody(updateFavoriteSchema),
	updateFavoriteContact
);

contactsRouter.delete('/:id', isValidId, authenticate, deleteContact);

export default contactsRouter;
