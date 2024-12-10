const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());

const mongoose = require('mongoose');
mongoose.connect(
  'mongodb+srv://haqueaminul:haqueaminul10100@barcode.v1ijb.mongodb.net/?retryWrites=true&w=majority&appName=BarCode'
);
const product = require('./models/product.schema.js');

const productRoutes = require('./routes/product.route.js');
app.use('/api', productRoutes);

const PORT = 4000;

app.listen(PORT, (error) => {
  if (error) {
    console.log(`📌 ~ app.listen ~ error:`, error);
  } else {
    console.log(`server is running ${PORT}`);
  }
});
