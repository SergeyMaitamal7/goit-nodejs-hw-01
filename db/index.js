const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

contactsPath = path.join(__dirname, 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(data);
};

const getContactById = async (id) => {
//   const contactId = String(id);
  const contacts = await listContacts();
  const result = await contacts.find((contact) => contact.id === id);
  return result || null;
};

const addContact = async (data) => {
  const contacts = await listContacts();
  console.log('contacts', contacts);
  const newContact = { id: nanoid(), ...data };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};

const removeContact = async ({ id }) => {
//   const contactId = String(id);
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === id);
  console.log('index ', index);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};
