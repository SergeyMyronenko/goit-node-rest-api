import HttpError from "../helpers/HttpError.js";
import Contact from "../models/contact.js";

export async function getAllContacts(req, res, next) {
  try {
    const allContacts = await Contact.find();
    res.status(200).json(allContacts);
  } catch (error) {
    next(error);
  }
}

export async function getOneContact(req, res, next) {
  try {
    const { id } = req.params;
    const oneContact = await Contact.findById(id);
    if (oneContact) {
      res.status(200).json(oneContact);
    }
    throw new HttpError(404);
  } catch (error) {
    next(error);
  }
}

export async function deletedContact(req, res, next) {
  try {
    const { id } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(id);
    if (deletedContact) {
      res.status(200).json(deletedContact);
    }
    throw new HttpError(404);
  } catch (error) {
    next(error);
  }
}

export async function createContact(req, res, next) {
  try {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
      throw new HttpError(400, "Fields must be filled");
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

    if (Object.keys(req.body).length === 0) {
      throw new HttpError(400, "Body must have at least one field");
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

    if (Object.keys(req.body).length === 0) {
      throw new HttpError(400, "Body must have at least one field");
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
