import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactSchema.js";
import Contact from "../models/contact.js";

export async function getAllContacts(req, res, next) {
  try {
    const allContacts = await Contact.find();
    res.status(200).json(allContacts);
  } catch (error) {
    next(error);
  }
}

export async function getOneContact(req, res) {
  const { id } = req.params;
  const oneContact = await Contact.findById(id);
  if (oneContact) {
    res.status(200).json(oneContact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
}

export async function deletedContact(req, res) {
  const { id } = req.params;
  const deletedContact = await Contact.findByIdAndDelete(id);
  if (deletedContact) {
    res.status(200).json(deletedContact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
}

export async function createContact(req, res, next) {
  try {
    const { name, email, phone } = req.body;

    const { error } = createContactSchema.validate({ name, email, phone });
    if (error) {
      return res.status(400).json({ message: "Fields must be filled" });
    }

    const newContact = await Contact.create({ name, email, phone });
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
}

export async function updateContact(req, res, next) {
  try {
    const { id } = req.params;
    const { name, email, phone } = req.body;
    const { error } = updateContactSchema.validate({ name, email, phone });

    if (Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ message: "Body must have at least one field" });
    }
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateStatusContact(req, res, next) {
  try {
    const { id } = req.params;
    const { favorite } = req.body;
    const { error } = updateContactSchema.validate({
      favorite,
    });

    if (Object.keys(req.body).length === 0) {
      return res
        .status(400)
        .json({ message: "Body must have at least one field" });
    }
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}
