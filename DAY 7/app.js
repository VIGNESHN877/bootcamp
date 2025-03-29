const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(express.json());

const PORT = 3000;
const DB_URL = 'mongodb://localhost:27017';
const DB_NAME = 'student_management';

let db, studentsCollection;

async function connectDB() {
  const client = new MongoClient(DB_URL);
  await client.connect();
  db = client.db(DB_NAME);
  studentsCollection = db.collection('students');
  console.log('Connected to MongoDB');
}

connectDB().catch(console.error);

// Routes will be added here

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.post('/students', 
    [
      body('name').notEmpty().withMessage('Name is required'),
      body('age').isInt({ min: 16, max: 99 }).withMessage('Age must be between 16 and 99'),
      body('major').notEmpty().withMessage('Major is required'),
      body('rollNo').notEmpty().withMessage('Roll number is required')
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        // Check for duplicate rollNo
        const existingStudent = await studentsCollection.findOne({ rollNo: req.body.rollNo });
        if (existingStudent) {
          return res.status(400).json({ error: 'Roll number already exists' });
        }
  
        const result = await studentsCollection.insertOne(req.body);
        res.status(201).json({
          message: 'Student created successfully',
          studentId: result.insertedId
        });
      } catch (err) {
        res.status(500).json({ error: 'Failed to create student' });
      }
    }
  );

  app.get('/students', async (req, res) => {
    try {
      const students = await studentsCollection.find().toArray();
      res.json(students);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch students' });
    }
  });

  app.get('/students/:id', async (req, res) => {
    try {
      const student = await studentsCollection.findOne({ 
        _id: new ObjectId(req.params.id) 
      });
      
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
      
      res.json(student);
    } catch (err) {
      res.status(400).json({ error: 'Invalid student ID' });
    }
  });

  app.put('/students/:id', 
    [
      body('name').optional().notEmpty().withMessage('Name cannot be empty'),
      body('age').optional().isInt({ min: 16, max: 99 }).withMessage('Age must be between 16 and 99'),
      body('major').optional().notEmpty().withMessage('Major cannot be empty'),
      body('rollNo').optional().notEmpty().withMessage('Roll number cannot be empty')
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        // Check if student exists
        const existingStudent = await studentsCollection.findOne({ 
          _id: new ObjectId(req.params.id) 
        });
        
        if (!existingStudent) {
          return res.status(404).json({ error: 'Student not found' });
        }
  
        // Check for duplicate rollNo if being updated
        if (req.body.rollNo && req.body.rollNo !== existingStudent.rollNo) {
          const duplicate = await studentsCollection.findOne({ 
            rollNo: req.body.rollNo 
          });
          if (duplicate) {
            return res.status(400).json({ error: 'Roll number already exists' });
          }
        }
  
        await studentsCollection.updateOne(
          { _id: new ObjectId(req.params.id) },
          { $set: req.body }
        );
        
        res.json({ message: 'Student updated successfully' });
      } catch (err) {
        res.status(500).json({ error: 'Failed to update student' });
      }
    }
  );

  app.delete('/students/:id', async (req, res) => {
    try {
      const result = await studentsCollection.deleteOne({ 
        _id: new ObjectId(req.params.id) 
      });
      
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'Student not found' });
      }
      
      res.json({ message: 'Student deleted successfully' });
    } catch (err) {
      res.status(400).json({ error: 'Invalid student ID' });
    }
  });

  /*We've already added validation using express-validator in the POST and PUT routes. The validation checks for:

Required fields

Data types

Value ranges

Empty strings*/

app.get('/students', async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
  
      const [students, total] = await Promise.all([
        studentsCollection.find()
          .skip(skip)
          .limit(limit)
          .toArray(),
        studentsCollection.countDocuments()
      ]);
  
      res.json({
        students,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
        totalStudents: total
      });
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch students' });
    }
  });

  app.get('/students/search', async (req, res) => {
    try {
      const searchTerm = req.query.q;
      if (!searchTerm) {
        return res.status(400).json({ error: 'Search term is required' });
      }
  
      const students = await studentsCollection.find({
        rollNo: { $regex: searchTerm, $options: 'i' }
      }).toArray();
  
      res.json(students);
    } catch (err) {
      res.status(500).json({ error: 'Search failed' });
    }
  });


  // Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
  });


  /*Test endpoints using Postman or curl:

POST /students - Create new student

GET /students - Get all students

GET /students/:id - Get specific student

PUT /students/:id - Update student

DELETE /students/:id - Delete student

GET /students/search?q=123 - Search by roll number */


