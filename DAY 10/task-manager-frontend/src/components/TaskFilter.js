import React from 'react';
import { TextField, Box } from '@mui/material';

const TaskFilter = ({ statusFilter, setStatusFilter }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        select
        fullWidth
        label="Filter by Status"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        SelectProps={{ native: true }}
      >
        <option value="">All Tasks</option>
        <option value="Open">Open</option>
        <option value="In Progress">In Progress</option>
        <option value="Completed">Completed</option>
      </TextField>
    </Box>
  );
};

export default TaskFilter;