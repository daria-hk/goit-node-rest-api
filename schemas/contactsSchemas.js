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

export const updateContactSchema = Joi.object({
  name: Joi.string().min(1).messages({
    "string.min": `"name" can't be empty`,
  }),
  email: Joi.string().email().messages({
    "string.email": `"email" must be valid`,
  }),
  phone: Joi.string().min(5).messages({
    "string.min": `"phone" must be at least 5 characters`,
  }),
})
  .min(1)
  .messages({
    "object.min": "At least one field (name, email, or phone) must be provided",
  });
