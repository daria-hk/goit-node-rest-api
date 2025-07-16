import express from "express";
import {
  getAllContacts,
  getOneContact,
  deleteContact,
  createContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
  contactSchema,
  updateContactSchema,
  updateStatusSchema,
} from "../schemas/contactsSchemas.js";
import authenticate from "../midleware/authenticate.js";

const contactsRouter = express.Router();
contactsRouter.get("/", authenticate, getAllContacts);
contactsRouter.get("/:id", authenticate, getOneContact);
contactsRouter.delete("/:id", authenticate, deleteContact);
contactsRouter.post(
  "/",
  authenticate,
  validateBody(contactSchema),
  createContact
);
contactsRouter.put(
  "/:id",
  authenticate,
  validateBody(updateContactSchema),
  updateContact
);
contactsRouter.patch(
  "/:id/favorite",
  authenticate,
  validateBody(updateStatusSchema),
  updateStatusContact
);

export default contactsRouter;
