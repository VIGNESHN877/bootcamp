import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Button, Box, Chip, CircularProgress } from '@mui/material';
import { format } from 'date-fns';
import { getTask, updateTask, deleteTask } from '../services/api';
import TaskForm from '../components/TaskForm'; // Added TaskForm import

const TaskDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await getTask(id);
        setTask(response.data);
      } catch (error) {
        console.error('Error fetching task:', error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };
    fetchTask();
  }, [id]);

  const handleComplete = async () => {
    try {
      await updateTask(id, { status: 'Completed' });
      const response = await getTask(id);
      setTask(response.data);
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTask(id);
      navigate('/');
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleUpdate = async (updatedTask) => {
    try {
      await updateTask(id, updatedTask);
      const response = await getTask(id);
      setTask(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  if (loading) return <CircularProgress />; // Show loading spinner

  if (!task) return <div>Task not found.</div>; // Handle case where task is not found

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {task.title}
        </Typography>
        
        <Box sx={{ mb: 2 }}>
          <Chip 
            label={task.status} 
            color={
              task.status === 'Completed' ? 'success' : 
              task.status === 'In Progress' ? 'warning' : 'primary'
            } 
          />
        </Box>
        
        <Typography variant="body1" paragraph>
          {task.description || 'No description provided.'}
        </Typography>
        
        {task.dueDate && (
          <Typography variant="body2" color="text.secondary">
            Due Date: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
          </Typography>
        )}
        
        <Box sx={{ mt: 4, display: 'flex', gap: 2 }}>
          <Button 
            variant="contained" 
            onClick={handleComplete}
            disabled={task.status === 'Completed'}
          >
            Mark as Complete
          </Button>
          <Button 
            variant="outlined" 
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel Edit' : 'Edit Task'}
          </Button>
          <Button 
            variant="outlined" 
            color="error" 
            onClick={handleDelete}
          >
            Delete Task
          </Button>
        </Box>
        
        {isEditing && (
          <Box sx={{ mt: 4 }}>
            <TaskForm 
              initialData={task} 
              onSubmit={handleUpdate} 
              onCancel={() => setIsEditing(false)} 
            />
          </Box>
        )}
      </Box>
    </Container>
  );
};

export default TaskDetailPage;