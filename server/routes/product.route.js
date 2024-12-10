const express = require('express');
const router = express.Router();
const Product = require('../models/product.schema.js');

router.post('/scan', async (req, res) => {
  const { barcode } = req.body;
  try {
    const response = await fetch(
      `https://products-test-aci.onrender.com/product/${barcode}`
    );
    const data = await response.json();
    if (!data.status) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    const { material, description } = data.product;
    let product = await Product.findOne({ barcode });
    if (!product) {
      product = new Product({ material, barcode, description });
      await product.save();
    }

    res.status(201).json({ message: 'Product added successfully.', product });
  } catch (err) {
    console.log(`📌 ~ router.post ~ err:`, err);
  }
});

router.get('/products', async (req, res) => {
  const { category } = req.query;
  try {
    const filter = category ? { category } : {};
    const products = await Product.find(filter);
    res.status(200).json({ products });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error retrieving products.', error: error.message });
  }
});

router.patch('/products/:id', async (req, res) => {
  const { id } = req.params;
  const { category } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(
      id,
      { category },
      { new: true }
    );
    if (!product)
      return res.status(404).json({ message: 'Product not found.' });

    res
      .status(200)
      .json({ message: 'Category updated successfully.', product });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error updating category.', error: error.message });
  }
});

router.post('/categories', async (req, res) => {
  const { category } = req.body;
  try {
    res
      .status(201)
      .json({ message: `Category "${category}" added successfully.` });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error adding category.', error: error.message });
  }
});

module.exports = router;
