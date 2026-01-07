/**
 * @description Contact Validation for contact us page
 */

import Joi from "joi";

export const contactSchema = Joi.object({
  name: Joi.string().trim().min(2).max(100).required().messages({
    "string.empty": "Full name is required",
    "string.min": "Full name must be at least 2 characters",
    "string.max": "Full name must not exceed 100 characters",
    "any.required": "Full name is required",
  }),

  phone: Joi.string()
    .pattern(/^\+?[0-9]{7,15}$/)
    .required()
    .messages({
      "string.empty": "Phone number is required",
      "string.pattern.base": "Enter a valid phone number",
      "any.required": "Phone number is required",
    }),

  email: Joi.string().email({ tlds: false }).required().messages({
    "string.empty": "Email address is required",
    "string.email": "Enter a valid email address",
    "any.required": "Email address is required",
  }),

  message: Joi.string().trim().min(10).max(1000).required().messages({
    "string.empty": "Message is required",
    "string.min": "Message must be at least 10 characters",
    "string.max": "Message must not exceed 1000 characters",
    "any.required": "Message is required",
  }),
});
