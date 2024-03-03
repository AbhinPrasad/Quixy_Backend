import Joi from "joi";
import moment from "moment";
import { messageConstants as message } from "../constants/index.js";

export const createProjectSchema = Joi.object({
  userId: Joi.string().required(),
  projectName: Joi.string().required(),
  projectShortName: Joi.string().min(2).max(4).required().messages({
    "string.min": message.projectShortMin,
    "string.max": message.projectShortMax,
  }),
  projectDescription: Joi.string().optional().allow(""),
});
