/**
 * @description This is the validation for all auth operations using joi
 */

import joi, { ref } from "joi";

/** ============== login validation schema ==================== */
export const LoginSchema = joi.object({
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.base": "Email must be a string",
      "string.empty": "Email is required",
      "string.email": "Please provide a valid email address",
      "any.required": "Email is required",
    }),
  password: joi.string().min(8).required().messages({
    "string.base": "Password must be a string",
    "string.empty": "Password is required",
    "string.min": "Password must be at least 8 characters long",
    "any.required": "Password is required",
  }),
});

/** ============= register validation schema ================ */
export const RegisterSchema = joi.object({
  name: joi.string().min(3).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "string.min": "Name must be at least 3 characters long",
    "any.required": "Name is required",
  }),
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.base": "Email must be a string",
      "string.empty": "Email is required",
      "string.email": "Please provide a valid email address",
      "any.required": "Email is required",
    }),
  password: joi
    .string()
    .pattern(
      new RegExp(
        "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$",
      ),
    )
    .min(8)
    .required()
    .messages({
      "string.pattern.base":
        "Password must contain at least 8 characters, including uppercase, lowercase, number, and special character",
      "string.empty": "Password is required",
      "any.required": "Password is required",
    }),
  confirmPassword: joi.string().valid(ref("password")).required().messages({
    "any.only": "Passwords do not match",
    "string.empty": "Confirm password is required",
    "any.required": "Confirm password is required",
  }),
});
