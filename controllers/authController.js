import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
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
      dateOfBirth: moment.utc(body.dateOfBirth, 'DD-MM-YYYY').toDate(),
      profession: body.profession,
      company: body.company,
      joinedDate: moment().toDate(),
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
    next(error);
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const body = req.body;
    const user = await User.findOne({ email: body.email, isActive: true });

    if (!user) {
      return next({ statusCode: 400, message: message.userNotFound });
    }
    const passwordMatch = bcrypt.compareSync(body.password, user.password);

    if (!passwordMatch) {
      return next({ statusCode: 400, message: message.passwordIncorrect });
    }
    const token = generateToken(user);
    response(res, message.loginSuccess, { token });
  } catch (error) {
    next(error);
  }
};

const generateToken = (user) => {
  const payload = {
    userId: user._id,
    username: user.username,
    email: user.email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
  return token;
};
