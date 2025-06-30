import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} from "../services/contactsServices.js";

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

export const updateContact = (req, res) => {};

export default {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
};
