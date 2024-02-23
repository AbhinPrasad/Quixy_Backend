import Joi from "joi";
import moment from "moment";

export const authRegSchema = Joi.object({
    userName: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.number().optional(),
    password: Joi.string().min(8).required(),
    confirmPassword: Joi.ref("password"), //Must match the value of 'password' field
    dateOfBirth: Joi.string()
    .required()
    .custom((value, helpers) => {
        const dob = moment(value, "DD-MM-YYYY", true); // Parse date string using Moment.js
        if (!dob.isValid()) {
            return helpers.message({ custom: 'must be a valid date in the format DD-MM-YYYY' });
        }
        return value;
    }),
    profession: Joi.string().required,
    company: Joi.string().optional()
})