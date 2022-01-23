const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    image: {
        type: String
    },
}, { timestamps: true });

const banners = mongoose.model('Banners', bannerSchema);

module.exports = banners;