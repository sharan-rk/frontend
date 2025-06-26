import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const InvoiceForm = () => {
  const [client, setClient] = useState('');
  const [items, setItems] = useState([{ description: '', quantity: '', price: '' }]);
  const navigate = useNavigate();

  const handleItemChange = (index, e) => {
    const newItems = [...items];
    newItems[index][e.target.name] = e.target.value;
    setItems(newItems);
  };

  const addItem = () => {
    setItems([...items, { description: '', quantity: '', price: '' }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const total = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
    axios.post('http://localhost:5000/api/invoices', { client, items, total })
      .then(() => navigate('/'))
      .catch(err => console.error(err));
  };

  return (
    <form className="invoice-form container" onSubmit={handleSubmit}>
      <h2>Create Invoice</h2>
      <input
        type="text"
        placeholder="Client Name"
        value={client}
        onChange={(e) => setClient(e.target.value)}
        required
      />
      {items.map((item, idx) => (
        <div className="form-row" key={idx}>
          <input
            type="text"
            name="description"
            placeholder="Item description"
            value={item.description}
            onChange={(e) => handleItemChange(idx, e)}
            required
          />
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={item.quantity}
            onChange={(e) => handleItemChange(idx, e)}
            required
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={item.price}
            onChange={(e) => handleItemChange(idx, e)}
            required
          />
        </div>
      ))}
      <button type="button" className="btn" onClick={addItem}>Add Item</button>
      <button type="submit" className="btn">Submit</button>
    </form>
  );
};

export default InvoiceForm;

