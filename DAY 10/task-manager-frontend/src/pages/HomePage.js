import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import TaskFilter from '../components/TaskFilter';
import TaskSort from '../components/TaskSort';
import { getTasks, deleteTask, updateTask, createTask } from '../services/api';  // Make sure to import createTask

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [sortOption, setSortOption] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, [statusFilter, sortOption]);

  const fetchTasks = async () => {
    try {
      const response = await getTasks(statusFilter, sortOption);
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleEdit = (id) => {
    const taskToEdit = tasks.find(task => task._id === id);
    setEditingTask(taskToEdit);
    setShowForm(true);
  };

  const handleComplete = async (id) => {
    try {
      await updateTask(id, { status: 'Completed' });
      fetchTasks();
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const handleSubmit = async (taskData) => {
    try {
      if (editingTask) {
        await updateTask(editingTask._id, taskData);
      } else {
        await createTask(taskData);  // No longer an undefined function error
      }
      setShowForm(false);
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Task Manager
        </Typography>
        
        {showForm ? (
          <TaskForm 
            initialData={editingTask} 
            onSubmit={handleSubmit} 
            onCancel={() => {
              setShowForm(false);
              setEditingTask(null);
            }} 
          />
        ) : (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Button 
                variant="contained" 
                onClick={() => setShowForm(true)}
              >
                Add New Task
              </Button>
            </Box>
            
            <TaskFilter 
              statusFilter={statusFilter} 
              setStatusFilter={setStatusFilter} 
            />
            
            <TaskSort 
              sortOption={sortOption} 
              setSortOption={setSortOption} 
            />
            
            <TaskList 
              tasks={tasks} 
              onDelete={handleDelete} 
              onEdit={handleEdit} 
              onComplete={handleComplete} 
            />
          </>
        )}
      </Box>
    </Container>
  );
};

export default HomePage;