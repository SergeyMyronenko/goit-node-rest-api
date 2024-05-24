import HttpError from "../helpers/HttpError.js";
import User from "../models/user.js";
import crypto from "node:crypto";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import mail from "../mail/mail.js";

export async function userRegistration(req, res, next) {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user !== null) {
      throw HttpError(409, "Email in use");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const generatedAvatar = gravatar.url(email);
    const verificationToken = crypto.randomUUID();

    const newUser = await User.create({
      email,
      password: hashPassword,
      avatarURL: `http:${generatedAvatar}`,
      verificationToken,
    });

    const { subscription } = newUser;

    await mail.sendMail({
      to: email,
      from: "mironych1987@gmail.com",
      subject: "Learn node.js it easy",
      html: `Thank you for registration, to confirm your email please go to this link <a href="http://localhost:3000/users/verify/${verificationToken}">Confirm registration</a>`,
      text: `Thank you for registration, to confirm your email please go to this link http://localhost:3000/users/verify/${verificationToken}`,
    });

    res.status(201).json({
      user: {
        email,
        subscription,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function userLogin(req, res, next) {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user === null) {
      throw HttpError(401, "Email or password is incorrect");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch === false) {
      throw HttpError(401, "Email or password is incorrect");
    }

    if (user.verify === false) {
      res.status(401).send({ message: "Please verify your email" });
    }

    const userInfo = {
      id: user._id,
      email: user.email,
    };

    const token = jwt.sign(userInfo, process.env.JWT_KEY, { expiresIn: "1h" });

    await User.findByIdAndUpdate(user._id, { token });

    res.status(200).json({
      token,
      user: {
        email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function userLogout(req, res, next) {
  try {
    await User.findByIdAndUpdate(req.user.id, { token: null });

    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

export async function userByToken(req, res, next) {
  const { id } = req.user;
  try {
    const currentUser = await User.findById(id);
    console.log(currentUser);

    if (!currentUser) {
      throw HttpError(401);
    }
    res.status(200).send(currentUser);
  } catch (error) {
    next(error);
  }
}
