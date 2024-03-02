import express from "express";
import { url } from "../constants/index.js";
import { userSignup, userLogin } from "../controllers/authController.js";
import { signupSchema, loginSchema } from "../validation/authSchema.js";
import { validate } from "../middlewares/validation.js";

const router = express.Router();

router.post(url.signUp, validate(signupSchema), userSignup);

router.post(url.login, validate(loginSchema), userLogin);

export default router;
