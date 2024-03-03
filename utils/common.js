import moment from "moment";

export const createdBy = (req) => {
  try {
    const info = {};
    info.requestMethod = req.method;
    info.requestTime = moment().format("MMMM Do YYYY, h:mm:ss a");
    info.userAgent = req.headers["User-Agent"];
    info.remoteAddr =
      req.headers["x-forwarded-for"] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;
    info.pathInfo = req.originalUrl; 
    info.user = req.hasOwnProperty('user') ? req.user : "user"
    return JSON.stringify(info);

  } catch (error) {
    console.log(chalk.redBright(error));
    return {};
  }
};
