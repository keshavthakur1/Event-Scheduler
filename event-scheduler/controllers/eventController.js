const Event = require('../models/Event');
const { hasConflict } = require('../utils/timeUtils');

exports.createEvent = async (req, res) => {
    const { title, start, end, date } = req.body;

    try {
        const events = await Event.find({ date });

      
        if (hasConflict(start, end, events)) {
            return res.status(400).json({ message: 'Event conflict detected!' });
        }

        const newEvent = new Event({ title, start, end, date });
        await newEvent.save();

        res.status(201).json(newEvent);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getEvents = async (req, res) => {
    const { date } = req.query;

    try {
        const events = await Event.find({ date });
        res.json(events);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};


exports.updateEvent = async (req, res) => {
    const { id } = req.params;
    const { title, start, end, date } = req.body;

    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found!' });
        }

        const events = await Event.find({ date, _id: { $ne: id } });
        if (hasConflict(start, end, events)) {
            return res.status(400).json({ message: 'Event conflict detected!' });
        }

        event.title = title;
        event.start = start;
        event.end = end;
        event.date = date;

        await event.save();
        res.json(event);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};


exports.deleteEvent = async (req, res) => {
    const { id } = req.params;

    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Event not found!' });
        }

        await event.remove();
        res.json({ message: 'Event deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};
