import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import chalk from "chalk";

import connectDB from "./config/db.js";
import { errorHandler } from "./middlewares/index.js";
import { authRoutes } from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
  credentials: true,
  methods: "GET,PUT,PATCH,POST,DELETE",
};

app.use(cors(corsOptions));
app.use("/",authRoutes);

app.use(errorHandler);

connectDB();

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
  console.log(chalk.blueBright(`Server running on port ${PORT}`));
});
