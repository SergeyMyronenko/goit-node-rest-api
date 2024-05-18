import * as fs from "node:fs/promises";
import path from "node:path";
import User from "../models/user.js";
import jimp from "jimp";

export async function userAvatar(req, res, next) {
  try {
    const userAvatar = await jimp.read(req.file.path);
    await userAvatar.cover(250, 250).writeAsync(req.file.path);

    await fs.rename(
      req.file.path,
      path.resolve("public/avatars", req.file.filename)
    );

    const user = await User.findByIdAndUpdate(
      {
        _id: req.user.id,
      },
      { avatarURL: `/avatars/${req.file.filename}` },
      { new: true }
    );

    if (!user) {
      throw new Error("User not found or update failed");
    }

    res.status(200).send({ avatarURL: user.avatarURL });
  } catch (error) {
    next(error);
  }
}
