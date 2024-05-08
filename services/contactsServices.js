import * as fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
const contactsPath = path.resolve('db', 'contacts.json');

async function listContacts() {
	const data = await fs.readFile(contactsPath, 'utf8');

	return JSON.parse(data);
}

async function writeContacts(contacts) {
	await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

async function getContactById(id) {
	const contacts = await listContacts();
	const contact = contacts.find(item => item.id === id);

	return contact || null;
}

async function addContact(contact) {
	const contacts = await listContacts();

	const newContact = {
		id: crypto.randomUUID(),
		...contact,
	};

	contacts.push(newContact);
	writeContacts(contacts);

	return newContact;
}

async function updateContact(id, contact) {
	const contacts = await listContacts();

	const index = contacts.findIndex(contact => contact.id === id);

	if (index === -1) {
		return null;
	}

	const updatedContact = { ...contact, id };

	contacts[index] = updatedContact;

	await writeContacts(contacts);

	return updatedContact;
}

async function removeContact(id) {
	const contacts = await listContacts();

	const index = contacts.findIndex(item => item.id === id);
	if (index === -1) {
		return null;
	}

	const [removedContact] = contacts.splice(index, 1);
	await writeContacts(contacts);

	return removedContact;
}

export default {
	listContacts,
	getContactById,
	removeContact,
	addContact,
	updateContact,
};
