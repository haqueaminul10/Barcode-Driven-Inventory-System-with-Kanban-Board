import './App.css';
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { scanBarcode } from './services/api';
import BarcodeScanner from './Components/BarcodeScanner';
import KanbanBoard from './Components/KanbanBoard';
function App() {
  const [showScanner, setShowScanner] = useState(false);

  const handleBarcodeDetected = async (barcode) => {
    try {
      const { data } = await scanBarcode(barcode);
      toast.success(`Product added: ${data.product.description}`);
    } catch (error) {
      toast.error('Failed to add product.');
    } finally {
      setShowScanner(false);
    }
  };

  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Inventory Management</h1>
        <button onClick={() => setShowScanner((prev) => !prev)}>
          {showScanner ? 'Close Scanner' : 'Scan Barcode'}
        </button>
      </header>

      {showScanner && <BarcodeScanner onDetected={handleBarcodeDetected} />}
      <KanbanBoard />

      <ToastContainer />
    </div>
  );
}

export default App;
