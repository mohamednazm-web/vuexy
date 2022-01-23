const mongoose = require('mongoose');

const bannerBottomSchema = new mongoose.Schema({
    image: {
        type: String
    },
}, { timestamps: true });

const bannerBottoms = mongoose.model('bottoms', bannerBottomSchema);

module.exports = bannerBottoms;