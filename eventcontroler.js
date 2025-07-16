const Event = require('../models/event');
const User = require('../models/user');

// Create Event
exports.createvent = async (req, res) => {
  try {
    const { title, datetime, location, capacity } = req.body;
    if (!title || !datetime || !location || !capacity) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    if (capacity <= 0 || capacity > 1000) {
      return res.status(400).json({ message: 'Capacity must be between 1 and 1000.' });
    }

    const event = await Event.create({ title, datetime, location, capacity });
    res.status(201).json({
      message: 'Event created successfully',
      data: event
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Event by ID
exports.getevent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id).populate('registrations', 'name email');
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({
      message: 'Event fetched successfully',
      data: event
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Register User to Event
exports.registerUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const event = await Event.findById(req.params.id);
    const user = await User.findById(userId);

    if (!event || !user) {
      return res.status(404).json({ message: 'User or Event not found' });
    }

    if (event.datetime < new Date()) {
      return res.status(400).json({ message: 'Cannot register for past event' });
    }

    if (event.registrations.includes(userId)) {
      return res.status(400).json({ message: 'User already registered' });
    }

    if (event.registrations.length >= event.capacity) {
      return res.status(400).json({ message: 'Event is full' });
    }

    event.registrations.push(userId);
    await event.save();

    res.status(200).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Cancel Registration
exports.deleteEvent = async (req, res) => {
  try {
    const { userId } = req.body;
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    const index = event.registrations.indexOf(userId);
    if (index === -1) {
      return res.status(400).json({ message: 'User not registered for this event' });
    }

    event.registrations.splice(index, 1);
    await event.save();

    res.status(200).json({ message: 'Registration cancelled successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// List All Events
exports.events = async (req, res) => {
  try {
    const allEvents = await Event.find();
    res.status(200).json({
      message: 'Events fetched successfully',
      data: allEvents
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
