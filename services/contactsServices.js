import Contact from "../db/contacts.js";

export async function listContacts() {
  const contactsList = await Contact.findAll();
  return contactsList;
}

export async function getContactById(contactId) {
  const contact = await Contact.findByPk(contactId);
  return contact || null;
}

export async function removeContact(contactId) {
  const contact = await Contact.findByPk(contactId);
  if (!contact) return null;
  contact.destroy();
  return contact;
}

export async function addContact(name, email, phone) {
  const newContact = await Contact.create({ name, email, phone });
  return newContact;
}

export async function updateContactService(contactId, updates) {
  const contact = await Contact.findByPk(contactId);
  if (!contact) return null;
  contact.update(updates);
  return contact;
}

export async function updateStatusContactService(contactId, favorite) {
  const contact = await Contact.findByPk(contactId);
  if (!contact) return null;

  contact.favorite = favorite;
  await contact.save();
  return contact;
}
