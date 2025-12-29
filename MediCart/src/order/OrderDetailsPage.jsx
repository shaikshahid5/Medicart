import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/navbar-1/Navbar";

function OrderDetailsPage() {
  const { orderId } = useParams();
  const navigate = useNavigate();

  const orderDetails = {
    id: orderId,
    date: "2025-12-20",
    total: 250,
    status: "In Transit",
    invoice: "INV-98765",
    address: {
      name: "John Doe",
      street: "123 Medical Street",
      city: "Pune",
      state: "MH",
      pincode: "411045",
    },
    products: [
      { name: "Paracetamol 500mg", qty: 2, price: 50 },
      { name: "Vitamin C Tablets", qty: 1, price: 120 },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">
        {/* Back button */}
        <button
          onClick={() => navigate("/orders")}
          className="text-green-700 border border-green-700 px-4 py-2 rounded hover:bg-green-50 transition mb-6"
        >
          ← Back to Orders
        </button>

        {/* Page Title */}
        <h2 className="text-3xl font-bold text-green-700 mb-6">
          Order Details
        </h2>

        {/* Card */}
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 space-y-8">
          {/* Order Summary */}
          <div className="space-y-2">
            <p className="text-sm text-gray-500">Order ID</p>
            <p className="text-green-700 font-semibold">{orderDetails.id}</p>

            <div className="grid grid-cols-2 gap-4 text-gray-700">
              <p><span className="font-medium">Date:</span> {orderDetails.date}</p>
              <p><span className="font-medium">Status:</span> {orderDetails.status}</p>
              <p><span className="font-medium">Invoice:</span> {orderDetails.invoice}</p>
              <p className="font-bold text-green-700">
                Total: ₹{orderDetails.total}
              </p>
            </div>
          </div>

          {/* Product Breakdown */}
          <div>
            <h3 className="text-xl font-semibold text-green-700 mb-4">
              Products
            </h3>
            <div className="divide-y divide-gray-200">
              {orderDetails.products.map((product, idx) => (
                <div
                  key={idx}
                  className="flex justify-between py-2 text-gray-700"
                >
                  <span>
                    {product.name} × {product.qty}
                  </span>
                  <span className="font-medium">₹{product.price * product.qty}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery Address */}
          <div>
            <h3 className="text-xl font-semibold text-green-700 mb-4">
              Delivery Address
            </h3>
            <div className="bg-gray-50 p-4 rounded border border-gray-200 space-y-1">
              <p className="text-gray-700 font-medium">{orderDetails.address.name}</p>
              <p className="text-gray-700">{orderDetails.address.street}</p>
              <p className="text-gray-700">
                {orderDetails.address.city}, {orderDetails.address.state} -{" "}
                {orderDetails.address.pincode}
              </p>
            </div>
            <p className="text-gray-700 font-bold mt-2">
              Estimated Delivery: 12th January 2026
            </p>
          </div>

          {/* Invoice Download */}
          <button
            onClick={() => alert("Download Invoice feature coming soon!")}
            className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
          >
            Download Invoice
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsPage;
