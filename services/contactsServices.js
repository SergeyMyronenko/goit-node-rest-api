import fs from "node:fs/promises";
import path from "node:path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

export async function listContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });

  return JSON.parse(data);
}

export async function getContactById(contactId) {
  const contactsList = await listContacts();
  const contactWtihId = contactsList.find(
    (contact) => contact.id === contactId
  );

  return contactWtihId || null;
}

export async function removeContact(contactId) {
  const allContacts = await listContacts();
  const removeIndex = allContacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (removeIndex === -1) {
    return null;
  }
  const [res] = allContacts.splice(removeIndex, 1);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return res;
}

export async function addContact(name, email, phone) {
  const allContacts = await listContacts();

  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  allContacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
}

export async function rewriteContact(id, data) {
  const dataContacts = await fs.readFile(contactsPath, { encoding: "utf-8" });
  const allContacts = JSON.parse(dataContacts);
  const findContact = allContacts.findIndex((item) => item.id === id);
  if (findContact === -1) {
    return null;
  }

  allContacts[findContact] = { id, ...data };
  await fs.writeFile(contactsPath, JSON.stringify(allContacts, null, 2));

  return allContacts[findContact];
}
