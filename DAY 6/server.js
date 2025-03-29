
const express = require('express');
const { body, validationResult } = require('express-validator');

const port =3000;
const app = express();
app.use(express.json());

// Sample data store
let items = [];

// POST endpoint with validation
app.post('/items', 
  // Validation middleware
  [
    body('id').isInt().withMessage('ID must be an integer'),
    body('name').isString().trim().notEmpty().withMessage('Name is required and must be a non-empty string'),
    body('price').optional().isFloat({ gt: 0 }).withMessage('Price must be a positive number if provided')
  ],
  (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // If validation passes, process the request
    const newItem = req.body;
    items.push(newItem);
    res.status(201).json(newItem);
  }
);

// GET endpoint to view all items
app.get('/items', (req, res) => {
  res.json(items);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});