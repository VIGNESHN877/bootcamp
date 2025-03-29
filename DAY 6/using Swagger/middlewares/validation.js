const { body, validationResult } = require('express-validator');

exports.userValidationRules = [
  body('name')
    .notEmpty().withMessage('Name is required')
    .isString().withMessage('Name must be a string')
    .trim()
    .isLength({ min: 2 }).withMessage('Name must be at least 2 characters')
];

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) return next();
  
  const extractedErrors = errors.array().map(err => ({
    [err.param]: err.msg
  }));

  return res.status(422).json({
    errors: extractedErrors
  });
};