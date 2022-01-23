const mongoose = require('mongoose');

// 0 ===> ONE WAY
// 1 ===> RETURN
const ticketSchema = new mongoose.Schema(
  {
    country: {
      type: String
    },
    departureDate: {
      type: String
    },
    returnDate: {
      type: String
    },
    name: {
      type: String
    },
    DateOfBirth: {
      type: String
    },
    phone: {
      type: String
    },
    email: {
      type: String
    },
    flyingType: {
      type: Number
    },
    child: {
      type: Number
    },
    adult: {
      type: Number
    },
    infants: {
      type: Number
    }
  },
  { timestamps: true }
);

ticketSchema.pre('save', function(next) {
  next();
});

const AllTickets = mongoose.model('Ticket', ticketSchema);

module.exports = AllTickets;
