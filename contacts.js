const fs = require("fs/promises");
const path = require("path");
const crypto = require("crypto");

const contactsPath = path.join(__dirname, "db/contacts.json");

const listContacts = async () => {
  const allContacts = await fs.readFile(contactsPath);
  return JSON.parse(allContacts);
};

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const contact = allContacts.find((contact) => contact.id === contactId);
  return contact || null;
};

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const index = allContacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const [deletedContact] = allContacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return deletedContact;
};

const addContact = async (name, email, phone) => {
  const allContacts = await listContacts();
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
};


module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
};