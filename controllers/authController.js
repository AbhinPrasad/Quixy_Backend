import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import chalk from "chalk";
import moment from "moment";
import { User } from "../models/index.js";
import { messageConstants as message } from "../constants/index.js";
import response from "../utils/response.js";

export const userSignup = async (req, res, next) => {
  try {
    const body = req.body;
    const userExists = await User.exists({ email: body.email });

    if (userExists) {
      return next({ statusCode: 400, message: message.userExists });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(body.password, salt);

    const newUser = new User({
      userName: body.userName,
      email: body.email,
      phone: body.phone,
      password: hashedPassword,
      dateOfBirth: moment.utc(body.dateOfBirth).toDate(),
      profession: body.profession,
      company: body.company,
      joinedDate: moment().toDate(),
      projects: [],
      isActive: true,
    });

    const savedUser = await newUser.save();

    if (!savedUser) {
      return next({ statusCode: 400, message: message.userRegFailed });
    }
    response(
      res,
      message.userRegSuccess,
      savedUser.id ? { id: savedUser.id } : {}
    );
  } catch (error) {
    console.log(chalk.redBright("user-signup error:", error));
    next(error);
  }
};
