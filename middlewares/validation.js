export const validate = (schema) => {
    return (req, res, next) => {
      const { error } = schema.validate(req.body);
  
      if (error) {
        // Handle validation error
        console.log(error.message);
  
        res.status(400).json({ errors: error.details });
      } else {
        // Data is valid, proceed to the next middleware
        next();
      }
    };
  };