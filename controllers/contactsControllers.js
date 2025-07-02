import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactService,
  updateStatusContactService,
} from "../services/contactsServices.js";

import Contact from "../db/contacts.js";

export const getAllContacts = async (_, res) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
};

export const getOneContact = async (req, res) => {
  const id = req.params.id;
  const contactById = await getContactById(id);

  if (!contactById) {
    return res.status(404).json({ message: "Not found" });
  }

  res.status(200).json(contactById);
};

export const deleteContact = async (req, res) => {
  const id = req.params.id;
  const deletedContact = await removeContact(id);

  if (!deletedContact) {
    return res.status(404).json({ message: "Not found" });
  }

  res.status(200).json(deletedContact);
};

export const createContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const newContact = await addContact(name, email, phone);
  res.status(201).json(newContact);
};

export const updateContact = async (req, res) => {
  console.log("PUT /api/contacts/:id called");

  const { id } = req.params;
  const updates = req.body;

  if (!updates || Object.keys(updates).length === 0) {
    return res
      .status(400)
      .json({ message: "Body must have at least one field" });
  }

  console.log("Updates received:", updates);

  const updatedContact = await updateContactService(id, updates);

  if (!updatedContact) {
    return res.status(404).json({ message: "Not found" });
  }

  res.status(200).json(updatedContact);
};

export const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;

  if (typeof favorite !== "boolean") {
    return res.status(400).json({ message: "Missing field 'favorite'" });
  }

  const updatedContact = await updateStatusContactService(id, favorite);

  if (!updatedContact) {
    return res.status(404).json({ message: "Not found" });
  }

  res.status(200).json(updatedContact);
};

export default {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
};
