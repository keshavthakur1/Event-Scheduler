import React from 'react';
import { TextField, Typography } from '@mui/material';

const Calendar = ({ setSelectedDate }) => {
  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>Select a Date</Typography>
      <TextField
        type="date"
        onChange={handleDateChange}
        variant="outlined"
        fullWidth
      />
    </div>
  );
};

export default Calendar;
