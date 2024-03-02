import { dataConstants, messageConstants } from "../constants/index.js";

const errorHandler = (err,req,res,next) => {
    console.log("error:",err);
    const statusCode = err.statusCode || 500
    const message = err.message || messageConstants.somethingWentWrong
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        stack: process.env.NODE_ENV === dataConstants.prod ? {} : err.stack
    })
}

export default errorHandler;