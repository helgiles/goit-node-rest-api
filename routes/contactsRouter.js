import express from 'express';
import {
	getAllContacts,
	getOneContact,
	deleteContact,
	createContact,
	updateContact,
} from '../controllers/contactsControllers.js';
import {
	createContactSchema,
	updateContactSchema,
} from '../schemas/contactsSchemas.js';
import validateBody from '../helpers/validateBody.js';

const jsonParser = express.json();

const contactsRouter = express.Router();

contactsRouter.get('/', getAllContacts);

contactsRouter.get('/:id', getOneContact);

contactsRouter.delete('/:id', deleteContact);

contactsRouter.post(
	'/',
	jsonParser,
	validateBody(createContactSchema),
	createContact
);

contactsRouter.put(
	'/:id',
	jsonParser,
	validateBody(updateContactSchema),
	updateContact
);

export default contactsRouter;
