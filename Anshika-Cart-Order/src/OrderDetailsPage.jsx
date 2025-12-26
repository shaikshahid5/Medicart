import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export default function OrderDetailsPage() {
  const { state } = useLocation();
  const item = state?.item;

  // ✅ INIT state from localStorage
  const [isCancelled, setIsCancelled] = useState(() => {
    if (!item) return false;
    return localStorage.getItem(`order_status_${item.id}`) === "Cancelled";
  });

  // ✅ keep state in sync if item changes
  useEffect(() => {
    if (item) {
      const savedStatus = localStorage.getItem(`order_status_${item.id}`);
      setIsCancelled(savedStatus === "Cancelled");
    }
  }, [item]);

  if (!item) return <p className="p-6">Order not found</p>;

  const handleCancelOrder = () => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (confirmCancel) {
      setIsCancelled(true);

      // ✅ persist cancel
      localStorage.setItem(
        `order_status_${item.id}`,
        "Cancelled"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT SECTION */}
        <div className="lg:col-span-2 bg-white rounded shadow">

          {/* PRODUCT */}
          <div className="p-6 flex justify-between border-b">
            <div>
              <h2 className="font-semibold text-lg">{item.name}</h2>

              <p className="text-sm text-gray-500 mt-1">
                {item.size || "8"}, {item.color || "Tan, White, Black"}
              </p>

              <p className="text-sm text-gray-500 mt-1">
                Seller: {item.seller || "lejano"}
              </p>

              <p className="mt-2 text-lg font-semibold">
                ₹{item.price * item.qty}
              </p>
            </div>

            <img
              src={item.image}
              alt={item.name}
              className="w-24 h-24 object-contain"
            />
          </div>

          {/* ORDER STATUS */}
          <div className="p-6 border-b">
            {!isCancelled ? (
              <>
                <div className="flex items-center gap-3 text-green-600 font-medium">
                  <span className="w-4 h-4 bg-green-600 rounded-full"></span>
                  Order Confirmed, Dec 06
                </div>

                <div className="flex items-center gap-3 mt-4 text-green-600 font-medium">
                  <span className="w-4 h-4 bg-green-600 rounded-full"></span>
                  Delivered, Dec 09
                </div>
              </>
            ) : (
              <div className="flex items-center gap-3 text-red-600 font-medium">
                <span className="w-4 h-4 bg-red-600 rounded-full"></span>
                Order Cancelled
              </div>
            )}

            {!isCancelled && (
              <button className="text-blue-600 mt-4 font-medium hover:underline">
                See All Updates →
              </button>
            )}

            <p className="text-sm text-gray-500 mt-4">
              {isCancelled
                ? "This order has been cancelled."
                : "Return policy ended on Dec 19"}
            </p>
          </div>

          {/* ACTIONS */}
          <div className="p-6 flex items-center gap-6">
            <div className="text-blue-600 font-medium cursor-pointer">
              💬 Chat with us
            </div>

            {!isCancelled && (
              <button
                onClick={handleCancelOrder}
                className="text-red-600 font-medium hover:underline"
              >
                ❌ Cancel Order
              </button>
            )}
          </div>
        </div>

        {/* RIGHT SECTION */}
        <div className="space-y-6">

          <div className="bg-white rounded shadow p-6">
            <h3 className="font-semibold mb-4">Delivery details</h3>

            <p className="text-sm">
              🏠 Home <br />
              Preet Vihar Rudrpapur <br />
              Uttarakhand, 263153
            </p>

            <p className="mt-3 text-sm">
              👤 Anshika Mishra <br />
              📞 8080808080
            </p>
          </div>

          <div className="bg-white rounded shadow p-6">
            <h3 className="font-semibold mb-4">Price details</h3>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Listing price</span>
                <span className="line-through">₹1499</span>
              </div>

              <div className="flex justify-between">
                <span>Special price</span>
                <span>₹453</span>
              </div>

              <div className="flex justify-between">
                <span>Total fees</span>
                <span>₹9</span>
              </div>

              <div className="flex justify-between text-green-600">
                <span>Other discount</span>
                <span>-₹37</span>
              </div>

              <hr />

              <div className="flex justify-between font-semibold">
                <span>Total amount</span>
                <span>₹{item.price * item.qty}</span>
              </div>

              <div className="flex justify-between mt-3">
                <span>Payment method</span>
                <span>Cash on Delivery</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
