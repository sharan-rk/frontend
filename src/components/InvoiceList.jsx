import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';

const InvoiceList = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/invoices')
      .then(res => setInvoices(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container">
      <Link className="btn" to="/new">Create New Invoice</Link>
      <ul className="invoice-list">
        {invoices.map(invoice => (
          <li key={invoice._id}>
            <Link to={`/invoice/${invoice._id}`}>{invoice.client} - ₹{invoice.total}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InvoiceList;