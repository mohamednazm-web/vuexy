const express = require('express');
const ticket = require('../controllers/ticketsController');

const router = express.Router();

router.post('/', ticket.createTicket);

module.exports = router;
