import express from "express";
import {
  addContact,
  getContactById,
  listContacts,
  removeContact,
} from "../services/contactsServices.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const allContacts = await listContacts();
  res.json(allContacts);
});

router.get("/:id", (req, res) => {
  const oneContact = getContactById();
  res.json(oneContact);
});

router.delete("/:id", (req, res) => {
  const deletedContact = removeContact();
  res.json(deletedContact);
});

router.post("/", (req, res) => {
  const addContact = addContact();
  res.json(addContact);
});

// router.put("/api/contacts/:id", (req, res) => {});

export default router;
