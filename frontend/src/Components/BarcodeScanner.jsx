import React, { useState } from 'react';
import axios from 'axios';

const BarcodeScanner = () => {
  const [barcode, setBarcode] = useState('');
  const [product, setProduct] = useState(null);
  const [error, setError] = useState('');

  const handleScan = async () => {
    if (!barcode) {
      setError('Please enter a barcode!');
      return;
    }

    setError('');
    try {
      const response = await axios.get(
        ` http://localhost:4000/api/product/${barcode}`
      );
      console.log(`📌 ~ handleScan ~ response:`, response);

      if (response.data.status) {
        setProduct(response.data.product);
        alert('Product fetched successfully!');
      } else {
        setError('Product not found!');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while fetching the product.');
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h2>Barcode Scanner</h2>
      <input
        type='text'
        placeholder='Enter Barcode'
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
        style={{ width: '100%', padding: '10px', marginBottom: '10px' }}
      />
      <button
        onClick={handleScan}
        style={{
          padding: '10px 20px',
          background: 'blue',
          color: 'white',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Scan Barcode
      </button>
      {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
      {product && (
        <div style={{ marginTop: '20px' }}>
          <h3>Product Details</h3>
          <p>
            <strong>Description:</strong> {product.description}
          </p>
          <p>
            <strong>Material:</strong> {product.material}
          </p>
          <p>
            <strong>Barcode:</strong> {product.barcode}
          </p>
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;
