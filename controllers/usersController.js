import * as fs from "node:fs";
import User from "../models/user.js";

export async function userAvatar(req, res, next) {
  console.log(req.file);
  try {
    res.send("Upload avatar");
  } catch (error) {
    next(error);
  }
}
