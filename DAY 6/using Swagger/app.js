const express = require('express');
const app = express();
const fs = require('fs').promises;
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
const { body, validationResult } = require('express-validator');
const usersFilePath = path.join(__dirname, 'data', 'users.json');
const { userValidationRules, validate } = require('./middlewares/validation');
const { AppError, handle404, globalErrorHandler } = require('./middlewares/errorHandler');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

// Task 1: Hello World
app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

// Initial hardcoded users (Task 2)
let users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' }
];

// Task 2: Get all users
app.get('/users', (req, res) => {
  res.json(users);
});

// Task 3: Get single user by ID
app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user);
});

// Continue with other tasks...
// Task 4: Add new user
app.post('/users', (req, res) => {
    const newUser = {
      id: users.length + 1,
      name: req.body.name
    };
    users.push(newUser);
    res.status(201).json({ message: 'User added', user: newUser });
  });
  async function readUsers() {
    const data = await fs.readFile(usersFilePath, 'utf8');
    return JSON.parse(data);
  }
  
  async function writeUsers(users) {
    await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
  }
  
  // Update all routes to use file system
  app.get('/users', async (req, res) => {
    try {
      const users = await readUsers();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: 'Error reading users' });
    }
  });
  
  app.post('/users', async (req, res) => {
    try {
      const users = await readUsers();
      const newUser = {
        id: users.length + 1,
        name: req.body.name
      };
      users.push(newUser);
      await writeUsers(users);
      res.status(201).json({ message: 'User added', user: newUser });
    } catch (err) {
      res.status(500).json({ message: 'Error adding user' });
    }});

    



  // Add 404 handler after all routes
app.use(handle404);

// Global error handler
app.use(globalErrorHandler);
const express = require('express');
const app = express();
const fs = require('fs').promises;
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');
const { body, validationResult } = require('express-validator');
const usersFilePath = path.join(__dirname, 'data', 'users.json');
const { userValidationRules, validate } = require('./middlewares/validation');
const { AppError, handle404, globalErrorHandler } = require('./middlewares/errorHandler');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());

// Task 1: Hello World
app.get('/', (req, res) => {
  res.json({ message: 'Hello World' });
});

// Initial hardcoded users (Task 2)
let users = [];

// Function to read users from file
async function readUsers() {
  try {
    const data = await fs.readFile(usersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Function to write users to file
async function writeUsers(users) {
  await fs.writeFile(usersFilePath, JSON.stringify(users, null, 2));
}

// Initialize users from file
async function initUsers() {
  users = await readUsers();
}

initUsers();

// Task 2: Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await readUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error reading users' });
  }
});

// Task 3: Get single user by ID
app.get('/users/:id', async (req, res) => {
  try {
    const users = await readUsers();
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error reading users' });
  }
});

// Task 4: Add new user
app.post('/users', userValidationRules(), validate, async (req, res) => {
  try {
    const users = await readUsers();
    const newUser = {
      id: users.length + 1,
      name: req.body.name
    };
    users.push(newUser);
    await writeUsers(users);
    res.status(201).json({ message: 'User added', user: newUser });
  } catch (err) {
    res.status(500).json({ message: 'Error adding user' });
  }
});

// Add 404 handler after all routes
app.use(handle404);

// Global error handler
app.use(globalErrorHandler);

