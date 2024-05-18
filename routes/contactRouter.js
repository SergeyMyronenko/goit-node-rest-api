import express from "express";

import {
  createContact,
  deletedContact,
  getAllContacts,
  getOneContact,
  updateContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactSchema.js";
import validateBody from "../helpers/validateBody.js";
import { authMiddleware } from "../helpers/authMiddleware.js";

const contactRouter = express.Router();

contactRouter.get("/", authMiddleware, getAllContacts);

contactRouter.get("/:id", authMiddleware, getOneContact);

contactRouter.delete("/:id", authMiddleware, deletedContact);

contactRouter.post(
  "/",
  validateBody(createContactSchema),
  authMiddleware,
  createContact
);

contactRouter.put(
  "/:id",
  validateBody(createContactSchema),
  authMiddleware,
  updateContact
);

contactRouter.patch(
  "/:id/favorite",
  validateBody(updateContactSchema),
  updateStatusContact
);

export default contactRouter;
