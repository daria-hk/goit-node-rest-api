import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const contactsPath = path.join(__dirname, "..", "db", "contacts.json");

export async function listContacts() {
  // Повертає масив контактів.
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

export async function getContactById(contactId) {
  // Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const contactsList = await listContacts();
  const contacts = contactsList.find((contact) => contact.id === contactId);
  return contacts || null;
}

export async function removeContact(contactId) {
  // Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const contactsList = await listContacts();
  const contactById = await getContactById(contactId);

  if (contactById) {
    const newContactsList = contactsList.filter(
      (contactById) => contactById.id !== contactId
    );
    await fs.writeFile(contactsPath, JSON.stringify(newContactsList, null, 2));
  }
  return contactById;
}

export async function addContact(name, email, phone) {
  // Повертає об'єкт доданого контакту (з id).
  const contactsList = await listContacts();

  const newContact = {
    id: randomUUID(),
    name,
    email,
    phone,
  };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return newContact;
}

export async function updateContactService(id, updates) {
  const contactsList = await listContacts();
  const index = contactsList.findIndex((c) => c.id === id);

  if (index === -1) {
    return null;
  }

  const updatedContact = { ...contactsList[index], ...updates };
  contactsList[index] = updatedContact;

  await fs.writeFile(contactsPath, JSON.stringify(contactsList, null, 2));
  return updatedContact;
}
