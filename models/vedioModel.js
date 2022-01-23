const mongoose = require('mongoose');

const vedioSchema = new mongoose.Schema(
  {
    title: {
      type: String
    },
    titleArabic: {
      type: String
    },
    titleEnglish: {
      type: String
    },
    image: {
      type: String
    },
    vedio: {
      type: String
    }
  },
  { timestamps: true }
);

const vedios = mongoose.model('Vedios', vedioSchema);

module.exports = vedios;
