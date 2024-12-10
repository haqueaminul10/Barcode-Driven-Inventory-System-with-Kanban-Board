const mongoose = require('mongoose');
const { type } = require('os');

const productSchema = new mongoose.Schema({
  material: {
    type: String,
    required: true,
  },
  barcode: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    default: 'Uncategorized',
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
