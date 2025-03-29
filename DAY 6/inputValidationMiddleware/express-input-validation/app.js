// app.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Input validation middleware
const validateInput = (req, res, next) => {
    const { name, age, email } = req.body;

    // Check if required fields are present
    if (!name || !age || !email) {
        return res.status(400).json({ error: 'Missing required fields: name, age, email' });
    }

    // Check types
    if (typeof name !== 'string') {
        return res.status(400).json({ error: 'Invalid type for name, expected a string' });
    }
    if (typeof age !== 'number') {
        return res.status(400).json({ error: 'Invalid type for age, expected a number' });
    }
    if (typeof email !== 'string') {
        return res.status(400).json({ error: 'Invalid type for email, expected a string' });
    }

    // If validation passes, proceed to the next middleware
    next();
};

// POST endpoint with validation
app.post('/submit', validateInput, (req, res) => {
    const { name, age, email } = req.body;
    // Here you would typically handle the data (e.g., save to a database)
    res.status(200).json({ message: 'Data received successfully', data: { name, age, email } });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});