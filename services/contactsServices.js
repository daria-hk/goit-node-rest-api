import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { fileURLToPath } from "url";
import { dirname } from "path";
import Contact from "../db/contacts.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const contactsPath = path.join(__dirname, "..", "db", "contacts.json");

export async function listContacts() {
  const contactsList = await Contact.findAll();
  return contactsList;
}

export async function getContactById(contactId) {
  const contact = await Contact.findByPk(contactId);
  return contact || null;
}

export async function removeContact(contactId) {
  const contact = await getContactById(contactId);
  if (!contact) return null;
  contact.destroy();
  return contact;
}

export async function addContact(name, email, phone) {
  const newContact = await Contact.create({ name, email, phone });
  return newContact;
}

export async function updateContactService(id, updates) {
  const contact = await getContactById(id);
  if (!contact) return null;
  contact.update(updates);
  return contact;
}

export async function updateStatusContact(req, res) {
  const { id } = req.params;
  const { favorite } = req.body;
  if (Object.keys(req.body).length === 0)
    throw HttpError(400, "Body must have at least field 'favorite'");
  const updatedFavorite = await changeFavorite(id, { favorite });

  if (!updatedFavorite) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(updatedFavorite);
}
