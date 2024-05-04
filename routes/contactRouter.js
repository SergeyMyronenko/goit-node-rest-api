import express from "express";

import {
  createContact,
  deletedContact,
  getAllContacts,
  getOneContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";

const contactRouter = express.Router();

contactRouter.get("/", getAllContacts);

contactRouter.get("/:id", getOneContact);

contactRouter.delete("/:id", deletedContact);

contactRouter.post("/", createContact);

contactRouter.put("/:id", updateContact);

contactRouter.patch("/:id/favorite", updateStatusContact);

export default contactRouter;
