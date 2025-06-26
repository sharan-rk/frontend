import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../App.css';

const InvoiceView = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/invoices/${id}`)
      .then(res => setInvoice(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!invoice) return <p>Loading...</p>;

  return (
    <div className="invoice-view container">
      <h2>Invoice for {invoice.client}</h2>
      <ul>
        {invoice.items.map((item, idx) => (
          <li key={idx}>
            {item.description} - {item.quantity} × ₹{item.price}
          </li>
        ))}
      </ul>
      <h3>Total: ₹{invoice.total}</h3>
    </div>
  );
};

export default InvoiceView;
