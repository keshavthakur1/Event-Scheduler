import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Alert } from '@mui/material';

const AddEventForm = ({ selectedDate, setEvents }) => {
  const [newEvent, setNewEvent] = useState({ title: '', start: '', end: '' });
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('/events', { ...newEvent, date: selectedDate })
      .then((res) => {
        setEvents((prevEvents) => [...prevEvents, res.data]);
        setError('');
      })
      .catch((err) => {
        setError(err.response.data.message);
      });
  };

  return (
    <div>
      <Typography variant="h5" gutterBottom>Add Event</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <TextField
          label="Event Title"
          name="title"
          variant="outlined"
          onChange={handleInputChange}
        />
        <TextField
          type="time"
          label="Start Time"
          name="start"
          variant="outlined"
          onChange={handleInputChange}
        />
        <TextField
          type="time"
          label="End Time"
          name="end"
          variant="outlined"
          onChange={handleInputChange}
        />
        <Button variant="contained" color="primary" type="submit">
          Add Event
        </Button>
      </form>
    </div>
  );
};

export default AddEventForm;
