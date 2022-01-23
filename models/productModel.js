const mongoose = require('mongoose');

const posterSchema = new mongoose.Schema(
  {
    productName: {
      type: String
    },
    productNameEnglish: {
      type: String
    },
    productNameArabic: {
      type: String
    },
    price: {
      type: Number
    },
    image: [
      {
        type: String
      }
    ],
    vedioUrl: {
      type: String
    },
    color: {
      type: String
    },
    description: {
      type: String
    },
    descriptionEnglish: {
      type: String
    },
    descriptionArabic: {
      type: String
    },
    brandName: {
      type: String
    },
    hasViewd: {
      type: Number
    },
    categories: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Categories'
    },
    subImage1: [
      {
        type: String
      }
    ],
    subImage2: [
      {
        type: String
      }
    ],
    subImage3: [
      {
        type: String
      }
    ],
    subImage4: [
      {
        type: String
      }
    ],
    subImage5: [
      {
        type: String
      }
    ],
    subImage6: [
      {
        type: String
      }
    ],
    subImage7: [
      {
        type: String
      }
    ],
    subImage8: [
      {
        type: String
      }
    ],
    subImage9: [
      {
        type: String
      }
    ],
    subImage10: [
      {
        type: String
      }
    ],
    subImage11: [
      {
        type: String
      }
    ],
    subImage12: [
      {
        type: String
      }
    ],
    subImage13: [
      {
        type: String
      }
    ],
    subImage14: [
      {
        type: String
      }
    ],
    subImage15: [
      {
        type: String
      }
    ],
    subImage16: [
      {
        type: String
      }
    ],
    subImage17: [
      {
        type: String
      }
    ],
    subImage18: [
      {
        type: String
      }
    ],
    subImage19: [
      {
        type: String
      }
    ],
    subImage20: [
      {
        type: String
      }
    ],
    time: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

const Products = mongoose.model('Products', posterSchema);

module.exports = Products;
