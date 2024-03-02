import Joi from "joi";
import moment from "moment";
import { messageConstants as message } from "../constants/index.js";

export const signupSchema = Joi.object({
  userName: Joi.string().required(),
  email: Joi.string().email().required().messages({
    "string.email": message.invalidEmail,
    "any.required": message.EmailRequired,
  }),
  phone: Joi.number().optional().allow(""),
  password: Joi.string()
    .min(8)
    .message(message.passwordMinValidation)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/
    )
    .message(message.passwordValidation),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({ "any.only": message.passwordNotMatch }),
  dateOfBirth: Joi.string()
    .required()
    .custom((value, helpers) => {
      const dob = moment(value, "DD-MM-YYYY", true);
      if (!dob.isValid()) {
        return helpers.message({
          custom: message.dateValidation,
        });
      }
      return value;
    }),
  profession: Joi.string().required(),
  company: Joi.string().optional(),
});

export const loginSchema = Joi.object().keys({
  email: Joi.string().email().required().messages({
    "string.email": message.invalidEmail,
    "any.required": message.EmailRequired,
  }),
  password: Joi.string().required().messages({
    "any.required": message.passwordRequired,
  }),
});
