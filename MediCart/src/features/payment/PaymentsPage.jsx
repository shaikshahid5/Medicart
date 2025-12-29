import React from 'react';
import './PaymentsPage.css';

const PaymentsPage = ({ payments }) => {
  return (
    <div className="module-container">
      <h2 className="page-title">Transaction History</h2>
      
      <div className="card">
        <div className="card-header">
          <span>Recent Activity</span>
          <button className="btn btn-primary btn-sm">Refresh</button>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Date</th>
              <th>Method</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p.id}>
                <td><strong>{p.id}</strong></td>
                <td>{p.date}</td>
                <td>{p.method}</td>
                <td>₹{p.amount.toFixed(2)}</td>
                <td><span className={`status-badge status-${p.status.toLowerCase()}`}>{p.status}</span></td>
                <td><button className="btn-link">View Receipt</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card alert-box">
        <h4>B2B Outstanding Balance</h4>
        <p>Your current dues: <strong>₹640.00</strong>. Please settle by Dec 15th.</p>
      </div>
    </div>
  );
};

export default PaymentsPage;