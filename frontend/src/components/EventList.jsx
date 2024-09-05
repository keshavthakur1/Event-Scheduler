import React from 'react';
import { List, ListItem, ListItemText, Typography } from '@mui/material';

const EventList = ({ selectedDate, events }) => {
  if (!selectedDate) {
    return <Typography variant="body1">Please select a date to view events.</Typography>;
  }

  return (
    <div>
      <Typography variant="h5" gutterBottom>Events for {selectedDate}</Typography>
      <List>
        {events.length > 0 ? (
          events.map((event) => (
            <ListItem key={event.id}>
              <ListItemText
                primary={event.title}
                secondary={`${event.start} - ${event.end}`}
              />
            </ListItem>
          ))
        ) : (
          <ListItem>
            <ListItemText primary="No events scheduled for this date." />
          </ListItem>
        )}
      </List>
    </div>
  );
};

export default EventList;
