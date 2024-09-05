import React, { useState } from 'react';
import Calendar from './components/Calendar';
import EventList from './components/EventList';
import AddEventForm from './components/AddEventForm';
import './App.css'

const App = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [events, setEvents] = useState([]);

  return (
    <div className="app-container">
      <h1>Event Scheduler</h1>
      <Calendar setSelectedDate={setSelectedDate} />
      <EventList selectedDate={selectedDate} events={events} setEvents={setEvents} />
      <AddEventForm selectedDate={selectedDate} setEvents={setEvents} />
    </div>
  );
};

export default App;
