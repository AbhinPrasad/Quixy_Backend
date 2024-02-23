import express from "express";
import { url } from "../constants/index.js";
import { userSignup } from "../controllers/authController.js";
import { authRegSchema } from "../validation/authSchema.js";
import { validate } from "../middlewares/validation.js";

const router = express.Router();

router.post(url.signUp, validate(authRegSchema), userSignup);

export default router;
