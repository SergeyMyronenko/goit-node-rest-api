import express from "express";

import {
  AddNewContact,
  deletedContactById,
  getAllContacts,
  getOneContact,
} from "../controllers/contactsControllers.js";

const router = express.Router();

router.get("/", getAllContacts);

router.get("/:id", getOneContact);

router.delete("/:id", deletedContactById);

router.post("/", AddNewContact);

// router.put("/api/contacts/:id", (req, res) => {});

export default router;
