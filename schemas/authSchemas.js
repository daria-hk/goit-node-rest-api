import Joi from "joi";
import { emailRgxp, passRgxp } from "../constants/auth.js";

export const authSchema = Joi.object({
  email: Joi.string().pattern(emailRgxp).required(),
  password: Joi.string().pattern(passRgxp).required(),
});

export const authVerifySchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
    "string.email": "Email must be a valid email",
    "string.empty": "Email cannot be empty",
  }),
});
