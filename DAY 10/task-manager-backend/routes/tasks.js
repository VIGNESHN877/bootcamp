const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// Create a task
router.post('/', async (req, res) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all tasks with sorting and filtering
router.get('/', async (req, res) => {
  try {
    const { status, sort } = req.query;
    const filter = {};
    if (status) filter.status = status;
    
    const sortOptions = {};
    if (sort === 'dueDateAsc') sortOptions.dueDate = 1;
    if (sort === 'dueDateDesc') sortOptions.dueDate = -1;
    
    const tasks = await Task.find(filter).sort(sortOptions);
    res.send(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single task
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).send();
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a task
router.patch('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).send();
    res.send(task);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).send();
    res.send(task);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;