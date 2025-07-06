import Joi from "joi";
import { emailRgxp, passRgxp } from "../constants/auth.js";

export const authSchema = Joi.object({
  email: Joi.string().pattern(emailRgxp).required(),
  password: Joi.string().pattern(passRgxp).required(),
});
