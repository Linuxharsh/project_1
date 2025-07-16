const mongoose = require('mongoose');

const eventschema = new mongoose.Schema({
   title: {
    type: String,
    required: true
  },
  datetime: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  capacity: {
    type: Number,
    required: true,
    max: 1000
  },
  registrations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

module.exports = mongoose.model('event',eventschema);