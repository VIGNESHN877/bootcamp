const { body, validationResult } = require('express-validator');
const AppError = require('./AppError');

const validateInput = (validationRules) => {
  return async (req, res, next) => {
    try {
      await Promise.all(validationRules.map(validation => validation.run(req)));
      
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map(err => ({
          field: err.param,
          message: err.msg
        }));
        
        throw new AppError('Validation failed', 400, { errors: errorMessages });
      }
      
      next();
    } catch (error) {
      next(error);
    }
  };
};

// ... (keep your existing userValidationRules)

module.exports = {
  validateInput,
                  userValidationRules,
};