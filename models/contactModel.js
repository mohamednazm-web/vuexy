const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    subject: {
        type: String
    },
    phone: {
        type: String
    },
    message: {
        type: String
    }
});

contactSchema.pre('save', function (next) {
    next();
});

const AllContacts = mongoose.model('Contacts', contactSchema);

module.exports = AllContacts;
