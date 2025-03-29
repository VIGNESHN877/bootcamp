const express = require('express');
const AppError = require('./AppError');
const { validateInput, userValidationRules } = require('./inputValidationMiddleware');
const globalErrorHandler = require('./errorController');

const app = express();
app.use(express.json());

// Routes
app.post('/api/users', 
  userValidationRules, 
  validateInput(userValidationRules), 
  (req, res) => {
    res.status(201).json({
      status: 'success',
      data: {
        user: req.body
      }
    });
  }
);

// 404 Handler for undefined routes
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler
app.use(globalErrorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});