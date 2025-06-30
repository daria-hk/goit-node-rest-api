import Joi from "joi";

export const contactSchema = Joi.object({
  name: Joi.string().min(1).required().messages({
    "string.empty": `"name" can't be empty`,
    "any.required": `"name" can't be empty`,
  }),
  email: Joi.string().email().required().messages({
    "string.email": `"email" can't be empty`,
    "any.required": `"email" can't be empty`,
  }),
  phone: Joi.string().min(5).required().messages({
    "string.empty": `"phone" can't be empty`,
    "any.required": `"phone" can't be empty`,
  }),
});

export const updateContactSchema = Joi.object({});
