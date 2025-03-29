const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// Hardcoded initial array of users
let users = [
    { id: 1, name: 'John Doe', email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com' }
];

// POST endpoint to add a new user
app.post('/users', (req, res) => {
    // Get the new user data from the request body
    const newUser = req.body;
    
    // Simple validation - check if name and email are provided
    if (!newUser.name || !newUser.email) {
        return res.status(400).json({ message: "Name and email are required" });
    }
    
    // Generate a simple ID (in a real app, you'd use a database auto-increment)
    newUser.id = users.length + 1;
    
    // Add the new user to the array
    users.push(newUser);
    
    // Send success response
    res.status(201).json({ message: "User added", user: newUser });
});

// Optional: GET endpoint to view all users (for testing)
app.get('/users', (req, res) => {
    res.json(users);
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});