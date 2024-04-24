import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
} from "../services/contactsServices.js";

export async function getAllContacts(req, res) {
  const allContacts = await listContacts();
  res.status(200).json(allContacts);
}

export async function getOneContact(req, res) {
  const { id } = req.params;
  const oneContact = getContactById(id);
  if (oneContact) {
    res.status(200).json(oneContact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
}

export async function deletedContactById(req, res) {
  const { id } = req.params;
  const deletedContact = removeContact(id);
  if (deletedContact) {
    res.status(200).json(deletedContact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
}

export async function AddNewContact(req, res) {
  const { name, email, phone } = req.params;
  const newContact = addContact(name, email, phone);
  if (!name || !email || !phone) {
    res.status(400).json({ message: "Filds must be filled" });
  } else {
    res.status(201).json(newContact);
  }
}
