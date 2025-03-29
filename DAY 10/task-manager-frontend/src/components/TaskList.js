import React from 'react';
import { List, ListItem, ListItemText, IconButton, Typography, Box, Chip } from '@mui/material';
import { Delete, Edit, CheckCircle } from '@mui/icons-material';
import { format } from 'date-fns';

const TaskList = ({ tasks, onDelete, onEdit, onComplete }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return 'success';
      case 'In Progress': return 'warning';
      default: return 'primary';
    }
  };

  return (
    <List>
      {tasks.map((task) => (
        <ListItem 
          key={task._id} 
          secondaryAction={
            <Box>
              <IconButton edge="end" onClick={() => onComplete(task._id)}>
                <CheckCircle color={task.status === 'Completed' ? 'success' : 'disabled'} />
              </IconButton>
              <IconButton edge="end" onClick={() => onEdit(task._id)}>
                <Edit color="primary" />
              </IconButton>
              <IconButton edge="end" onClick={() => onDelete(task._id)}>
                <Delete color="error" />
              </IconButton>
            </Box>
          }
        >
          <ListItemText
            primary={task.title}
            secondary={
              <>
                <Typography component="span" display="block">
                  {task.description}
                </Typography>
                {task.dueDate && (
                  <Typography component="span" display="block" color="text.secondary">
                    Due: {format(new Date(task.dueDate), 'MMM dd, yyyy')}
                  </Typography>
                )}
              </>
            }
          />
          <Chip 
            label={task.status} 
            color={getStatusColor(task.status)} 
            sx={{ marginLeft: 2 }}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default TaskList;