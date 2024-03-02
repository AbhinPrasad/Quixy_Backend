import express from "express";
import { url } from "../constants/index.js";
import { createProject } from "../controllers/projectController.js";
import { createProjectSchema } from "../validation/projectSchema.js";
import { validate } from "../middlewares/validation.js";

const router = express.Router();

router.post(url.createProject, validate(createProjectSchema), createProject);

export default router;
