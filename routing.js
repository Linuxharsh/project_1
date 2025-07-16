const express = require('express');
const router = express.Router();

const{
  createvent,
  getevent,
  registerUser,
  deleteEvent,
  events
} = require('../controller/eventcontroler');


router.post('/', createvent);
router.get('/', events);
router.get('/:id', getevent);
router.post('/:id/register', registerUser);
router.delete('/:id', deleteEvent);

module.exports = router;