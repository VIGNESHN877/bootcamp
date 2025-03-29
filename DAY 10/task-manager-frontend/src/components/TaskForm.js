import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TextField, Button, Box, MenuItem, Grid } from '@mui/material';

const TaskForm = ({ initialData, onSubmit, onCancel }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    status: 'Open'
  });

  useEffect(() => {
    if (initialData) {
      setTask({
        title: initialData.title || '',
        description: initialData.description || '',
        dueDate: initialData.dueDate ? formatDateForInput(initialData.dueDate) : '',
        status: initialData.status || 'Open'
      });
    }
  }, [initialData]);

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task.title.trim() === '') {
      alert('Title is required');
      return;
    }
    onSubmit(task);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            required
            fullWidth
            label="Title"
            name="title"
            value={task.title}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            name="description"
            value={task.description}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="date"
            label="Due Date"
            name="dueDate"
            InputLabelProps={{ shrink: true }}
            value={task.dueDate}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            select
            label="Status"
            name="status"
            value={task.status}
            onChange={handleChange}
          >
            {['Open', 'In Progress', 'Completed'].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button onClick={onCancel} sx={{ mr: 2 }}>
          Cancel
        </Button>
        <Button type="submit" variant="contained">
          {initialData ? 'Update Task' : 'Create Task'}
        </Button>
      </Box>
    </Box>
  );
};

TaskForm.propTypes = {
  initialData: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    dueDate: PropTypes.string,
    status: PropTypes.string,
  }),
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default TaskForm;