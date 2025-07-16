import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactService,
  updateStatusContactService,
} from "../services/contactsServices.js";

export const getAllContacts = async (req, res) => {
  const ownerId = req.user.id;
  const contacts = await listContacts(ownerId);
  res.status(200).json(contacts);
};

export const getOneContact = async (req, res) => {
  const id = req.params.id;
  const ownerId = req.user.id;
  const contactById = await getContactById(id, ownerId);

  if (!contactById) {
    return res.status(404).json({ message: "Not found" });
  }

  res.status(200).json(contactById);
};

export const deleteContact = async (req, res) => {
  const id = req.params.id;
  const ownerId = req.user.id;
  const deletedContact = await removeContact(id, ownerId);

  if (!deletedContact) {
    return res.status(404).json({ message: "Not found" });
  }

  res.status(200).json(deletedContact);
};

export const createContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const ownerId = req.user.id;
  const newContact = await addContact(name, email, phone, ownerId);
  res.status(201).json(newContact);
};

export const updateContact = async (req, res) => {
  console.log("PUT /api/contacts/:id called");

  const { id } = req.params;
  const updates = req.body;
  const ownerId = req.user.id;

  if (!updates || Object.keys(updates).length === 0) {
    return res
      .status(400)
      .json({ message: "Body must have at least one field" });
  }

  // console.log("Updates received:", updates);

  const updatedContact = await updateContactService(id, updates, ownerId);

  if (!updatedContact) {
    return res.status(404).json({ message: "Not found" });
  }

  res.status(200).json(updatedContact);
};

export const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;
  const ownerId = req.user.id;

  if (typeof favorite !== "boolean") {
    return res.status(400).json({ message: "Missing field 'favorite'" });
  }

  const updatedContact = await updateStatusContactService(
    id,
    favorite,
    ownerId
  );

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
