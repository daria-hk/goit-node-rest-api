import Contact from "../db/contacts.js";
import { Op } from "sequelize";

export async function listContacts(ownerId) {
  const contactsList = await Contact.findAll({ where: { owner: ownerId } });
  return contactsList;
}

export async function getContactById(contactId, ownerId) {
  const contact = await Contact.findOne({
    where: { id: contactId, owner: ownerId },
  });
  return contact || null;
}

export async function removeContact(contactId, ownerId) {
  const contact = await Contact.findOne({
    where: { id: contactId, owner: ownerId },
  });
  if (!contact) return null;
  await contact.destroy();
  return contact;
}

export async function addContact(name, email, phone, ownerId) {
  const newContact = await Contact.create({
    name,
    email,
    phone,
    owner: ownerId,
  });
  return newContact;
}

export async function updateContactService(contactId, updates, ownerId) {
  const contact = await Contact.findOne({
    where: { id: contactId, owner: ownerId },
  });
  if (!contact) return null;
  await contact.update(updates);
  return contact;
}

export async function updateStatusContactService(contactId, favorite, ownerId) {
  const contact = await Contact.findOne({
    where: { id: contactId, owner: ownerId },
  });
  if (!contact) return null;

  contact.favorite = favorite;
  await contact.save();
  return contact;
}
