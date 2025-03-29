import React from 'react';
import { TextField, Box } from '@mui/material';

const TaskSort = ({ sortOption, setSortOption }) => {
  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        select
        fullWidth
        label="Sort by Due Date"
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        SelectProps={{ native: true }}
      >
        <option value="">No sorting</option>
        <option value="dueDateAsc">Due Date (Ascending)</option>
        <option value="dueDateDesc">Due Date (Descending)</option>
      </TextField>
    </Box>
  );
};

export default TaskSort;