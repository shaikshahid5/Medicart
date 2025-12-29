import React, { useState } from 'react';
import './CheckoutPage.css';

const CheckoutPage = ({ cart, onPaymentSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = cart.items.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const total = subtotal + cart.tax + cart.delivery;

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess();
    }, 2000);
  };

  return (
    <div className="module-container">
      <h2 className="page-title">Checkout & Payment</h2>
      <div className="checkout-grid">
        <div className="card">
          <div className="card-header">Select Payment Method</div>
          <div className="form-group">
            <label className="form-label">Payment Gateway</label>
            <select className="form-select" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
              <option value="card">Credit/Debit Card (Stripe)</option>
              <option value="upi">UPI / QR Code</option>
              <option value="cod">Cash on Delivery</option>
            </select>
          </div>

          {paymentMethod === 'card' && (
            <div className="card-animation-container">
              <div className="form-group">
                <label className="form-label">Card Number</label>
                <input type="text" className="form-input" placeholder="0000 0000 0000 0000" />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">Expiry</label>
                  <input type="text" className="form-input" placeholder="MM/YY" />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label className="form-label">CVV</label>
                  <input type="password" className="form-input" placeholder="123" />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="card">
          <div className="card-header">Order Summary</div>
          {cart.items.map(item => (
            <div key={item.id} className="summary-line">
              <span>{item.name} (x{item.qty})</span>
              <span>₹{item.price * item.qty}</span>
            </div>
          ))}
          <hr className="divider" />
          <div className="summary-line text-gray"><span>Tax</span><span>₹{cart.tax}</span></div>
          <div className="summary-line text-gray"><span>Delivery</span><span>₹{cart.delivery}</span></div>
          <div className="summary-total"><span>Total</span><span>₹{total}</span></div>
          <button className="btn btn-primary w-full mt-20" onClick={handlePayment} disabled={isProcessing}>
            {isProcessing ? 'Processing...' : `Pay ₹${total}`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;