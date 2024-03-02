export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({
        success: false,
        statusCode: 400,
        message: error.message,
      });
    } else {
      next();
    }
  };
};
