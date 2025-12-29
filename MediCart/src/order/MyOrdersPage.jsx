import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StarIcon } from "@heroicons/react/24/solid";
import Navbar from "../components/navbar-1/Navbar";

function MyOrdersPage() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([
    {
      id: "ORD123",
      date: "2025-12-20",
      total: 250,
      status: "Delivered",
      rating: 0,
      products: [
        { name: "Paracetamol 500mg", qty: 2, price: 50 },
        { name: "Vitamin C Tablets", qty: 1, price: 120 },
      ],
    },
    {
      id: "ORD124",
      date: "2025-12-21",
      total: 120,
      status: "Shipped",
      rating: 0,
      products: [
        { name: "Antiseptic Solution", qty: 1, price: 75 },
        { name: "Bandages Pack", qty: 1, price: 45 },
      ],
    },
  ]);

  const handleRating = (orderId, ratingValue) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, rating: ratingValue } : order
      )
    );
  };

  const getStatusColor = status => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-4xl mx-auto p-6">
        <h2 className="text-3xl font-bold text-green-700 mb-8">My Orders</h2>

        <div className="space-y-8">
          {orders.map(order => (
            <div
              key={order.id}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition"
            >
              {/* Order Header */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="text-green-700 font-semibold">{order.id}</p>
                  <p className="text-gray-600 text-sm">Date: {order.date}</p>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                  <p className="text-green-700 font-bold mt-2">
                    ₹{order.total}
                  </p>
                </div>
              </div>

              {/* Product List */}
              <div className="border-t border-gray-200 pt-4 space-y-2">
                {order.products.map((product, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between text-sm py-1"
                  >
                    <span className="text-gray-700">
                      {product.name} × {product.qty}
                    </span>
                    <span className="text-green-700 font-medium">
                      ₹{product.price * product.qty}
                    </span>
                  </div>
                ))}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 mt-4">
                {[1, 2, 3, 4, 5].map(star => (
                  <StarIcon
                    key={star}
                    onClick={() => handleRating(order.id, star)}
                    className={`w-5 h-5 cursor-pointer transition ${
                      order.rating >= star
                        ? "text-yellow-400"
                        : "text-gray-300 hover:text-yellow-200"
                    }`}
                  />
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {order.rating > 0 ? `${order.rating}/5` : "Rate this order"}
                </span>
              </div>

              {/* View Details Button */}
              <button
                onClick={() => navigate(`/orders/${order.id}`)}
                className="mt-6 w-full py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-semibold"
              >
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyOrdersPage;
