import React from 'react';
import { Routes, Route } from 'react-router-dom';
import InvoiceList from './components/InvoiceList';
import InvoiceForm from './components/InvoiceForm';
import InvoiceView from './components/InvoiceView';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<InvoiceList />} />
      <Route path="/new" element={<InvoiceForm />} />
      <Route path="/invoice/:id" element={<InvoiceView />} />
    </Routes>
  );
};

export default App;