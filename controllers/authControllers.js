// import HttpError from "../helpers/HttpError";
import HttpError from "../helpers/HttpError.js";
import User from "../models/user.js";
import bcrypt from "bcrypt";

export async function userRegistration(req, res, next) {
  const { name, email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user !== null) {
      return res.status(409).send({ message: "Email in use" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const result = await User.create({ name, email, password: hashPassword });
    res.status(201).send({ message: "Registration succesfully" });
  } catch (error) {
    next(error);
  }
}

export async function userLogin(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (user === null) {
      return res.status(401).send("Email or password is incorrect");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch === false) {
      return res.status(401).send("Email or password is incorrect");
    }

    res.status(200);
    // .send(token; "Token")
  } catch (error) {
    next(error);
  }
}

export function userLogout(req, res, next) {}

export function userByToken(req, res, next) {}
