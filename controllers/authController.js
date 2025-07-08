import HttpError from "../helpers/HttpError.js";
import controllerWrapper from "../helpers/controllerWrapper.js";
import {
  registerUser,
  loginUser,
  logoutUser,
  changeSubscription,
  changeAvatar,
} from "../services/authServices.js";
import { resolve, join } from "node:path";
import fs from "fs/promises";
import gravatar from "gravatar";

const avatarsDir = resolve("public", "avatars");

const registerController = async (req, res, next) => {
  try {
    let avatarPath = null;
    if (req.file) {
      const { path: oldPath, filename } = req.file;
      const newPath = join(avatarsDir, filename);
      await fs.rename(oldPath, newPath);
      avatarPath = join("public", "avatars", filename);
      req.body.avatar = avatarPath;
    } else {
      const avatarURL = gravatar.url(req.body.email, {
        s: "200",
        r: "pg",
        d: "404",
      });
      req.body.avatarURL = avatarURL;
    }
    const newUser = await registerUser(req.body);

    res.status(201).json({
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL,
    });
  } catch (err) {
    if (err.name === "SequelizeUniqueConstraintError") {
      throw HttpError(409, "Email in use");
    }
    throw err;
  }
};

const loginController = async (req, res, next) => {
  const { token, user } = await loginUser(req.body);
  res.json({ token, user });
};

const getCurrentController = async (req, res, next) => {
  const { email, subscription } = req.user;
  res.json({ email, subscription });
};

const logoutController = async (req, res, next) => {
  await logoutUser(req.user);
  res.status(204).json("No Content");
};

const subscriptionController = async (req, res, next) => {
  const { id } = req.user;
  const { subscription } = req.body;

  if (!["starter", "pro", "business"].includes(subscription)) {
    throw HttpError(400, "Invalid subscription value");
  }

  const updatedUser = await changeSubscription(id, subscription);
  res.json({
    email: updatedUser.email,
    subscription: updatedUser.subscription,
  });
};

const avatarsController = async (req, res, next) => {
  let avatar = null;
  const { id } = req.user;
  if (req.file) {
    const { path: oldPath, filename } = req.file;
    const newPath = join(avatarsDir, filename);
    await fs.rename(oldPath, newPath);
    avatar = join("public", "avatars", filename);
    const changedAvatar = await changeAvatar(id, avatar);
    return res.json({
      avatarURL: changedAvatar.avatarURL,
    });
  }
};

export default {
  registerController: controllerWrapper(registerController),
  loginController: controllerWrapper(loginController),
  getCurrentController: controllerWrapper(getCurrentController),
  logoutController: controllerWrapper(logoutController),
  subscriptionController: controllerWrapper(subscriptionController),
  avatarsController: controllerWrapper(avatarsController),
};
