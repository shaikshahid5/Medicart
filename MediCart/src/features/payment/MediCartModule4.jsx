import React, { useState } from 'react';
import CheckoutPage from './CheckoutPage';
import InvoicePage from './InvoicePage';
import PaymentsPage from './PaymentsPage';
import './Theme.css'; // Global variables and layout

const MOCK_DATA = {
  cart: {
    items: [
      { id: 1, name: 'Paracetamol 500mg', qty: 2, price: 50.00 },
      { id: 2, name: 'Amoxicillin 250mg', qty: 1, price: 120.00 },
      { id: 3, name: 'Vitamin C Serum', qty: 1, price: 450.00 },
    ],
    tax: 30.00,
    delivery: 40.00
  },
  payments: [
    { id: 'TRX-9812', date: '2025-10-12', amount: 1200.00, status: 'PAID', method: 'UPI' },
    { id: 'TRX-9813', date: '2025-11-01', amount: 640.00, status: 'PENDING', method: 'Credit Card' },
  ]
};

const MediCartModule4 = () => {
  const [activeTab, setActiveTab] = useState('checkout');

  return (
    <div className="app-wrapper">
      <nav className="main-nav">
        <div className="nav-logo">MediCart</div>
        <div className="nav-links">
          <button 
            onClick={() => setActiveTab('checkout')} 
            className={activeTab === 'checkout' ? 'active' : ''}
          >
            1. Checkout
          </button>
          <button 
            onClick={() => setActiveTab('invoice')} 
            className={activeTab === 'invoice' ? 'active' : ''}
          >
            2. Invoice
          </button>
          <button 
            onClick={() => setActiveTab('payments')} 
            className={activeTab === 'payments' ? 'active' : ''}
          >
            3. History
          </button>
        </div>
      </nav>

      <main>
        {activeTab === 'checkout' && (
          <CheckoutPage 
            cart={MOCK_DATA.cart} 
            onPaymentSuccess={() => setActiveTab('invoice')} 
          />
        )}
        {activeTab === 'invoice' && (
          <InvoicePage cart={MOCK_DATA.cart} />
        )}
        {activeTab === 'payments' && (
          <PaymentsPage payments={MOCK_DATA.payments} />
        )}
      </main>
    </div>
  );
};

export default MediCartModule4;