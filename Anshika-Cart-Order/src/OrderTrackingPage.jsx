
import { useLocation, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import Navbar from "./Navbar";

export default function OrderTrackingPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // SAFE cart fetch
  const cart = Array.isArray(location.state?.cart) ? location.state.cart : [];

  const [search, setSearch] = useState("");
  const [statusFilters, setStatusFilters] = useState([]);
  const [timeFilters, setTimeFilters] = useState([]);

  // 🚨 SAFETY GUARD
  if (!Array.isArray(cart) || cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        No orders found. Please open this page from Orders.
      </div>
    );
  }

  /* ================= HELPER FUNCTIONS ================= */

  // ✅ Persistent order status
  const getOrderStatus = (item) => {
    const id = item?.id ?? "";
    return (
      (id && localStorage.getItem(`order_status_${id}`)) ||
      item?.status ||
      "Delivered"
    );
  };

  // ✅ Delivered / Order date
  const getOrderDateText = (item) => {
    if (getOrderStatus(item) === "Cancelled") {
      return "Order was cancelled";
    }
    return item?.deliveredDate || item?.orderDate || "Recently delivered";
  };

  // Toggle checkbox logic
  const toggleFilter = (value, list, setList) => {
    setList(
      list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
    );
  };

  // INR currency formatter
  const formatINR = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount ?? 0);

  /* ================= FILTER LOGIC ================= */

  const filteredOrders = useMemo(() => {
    return cart.filter((item) => {
      const name = item?.name ?? "";
      const status = getOrderStatus(item);
      const orderYear = item?.orderYear ?? "2024";

      const matchSearch = name.toLowerCase().includes(search.toLowerCase());

      const matchStatus =
        statusFilters.length === 0 || statusFilters.includes(status);

      const matchTime =
        timeFilters.length === 0 || timeFilters.includes(orderYear);

      return matchSearch && matchStatus && matchTime;
    });
  }, [cart, search, statusFilters, timeFilters]);

  /* ================= UI ================= */

  return (
    <>
    
    <div className="min-h-screen bg-gray-100 p-6">
      {/* If your Navbar accepts props, pass them, else keep as is */}
    

      <div className="max-w-7xl mx-auto flex gap-6">
        {/* ================= LEFT FILTER PANEL ================= */}
        <div className="w-64 bg-white p-4 rounded shadow-sm">
          {/* 🔙 BACK BUTTON */}
          <button
            onClick={() => navigate("/cart")}
            className="flex items-center gap-2 text-green-600 font-medium mb-4 hover:underline"
            type="button"
            aria-label="Back to Cart"
          >
            ← Back to Cart
          </button>

          <h3 className="font-semibold mb-4">Filters</h3>

          {/* ORDER STATUS */}
          <div className="mb-6">
            <h4 className="font-medium text-sm mb-2">ORDER STATUS</h4>
            {["On the way", "Delivered", "Cancelled", "Returned"].map(
              (status) => (
                <label
                  key={status}
                  className="flex items-center gap-2 text-sm mb-2"
                >
                  <input
                    type="checkbox"
                    checked={statusFilters.includes(status)}
                    onChange={() =>
                      toggleFilter(status, statusFilters, setStatusFilters)
                    }
                  />
                  {status}
                </label>
              )
            )}
          </div>

          {/* ORDER TIME */}
          <div>
            <h4 className="font-medium text-sm mb-2">ORDER TIME</h4>
            {["Last 30 days", "2024", "2023", "Older"].map((time) => (
              <label key={time} className="flex items-center gap-2 text-sm mb-2">
                <input
                  type="checkbox"
                  checked={timeFilters.includes(time)}
                  onChange={() => toggleFilter(time, timeFilters, setTimeFilters)}
                />
                {time}
              </label>
            ))}
          </div>
        </div>

        {/* ================= RIGHT CONTENT ================= */}
        <div className="flex-1 space-y-4">
          {/* SEARCH BAR */}
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Search your orders here"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-2 border rounded focus:outline-none"
              aria-label="Search orders"
            />
            <button
              className="bg-green-600 text-white px-6 rounded"
              type="button"
            >
              Search Orders
            </button>
          </div>

          {/* ORDERS LIST */}
          {filteredOrders.map((item) => {
            const status = getOrderStatus(item);
            const id = item?.id ?? Math.random().toString(36).slice(2);
            const qty = item?.qty ?? 1;
            const price = item?.price ?? 0;

            return (
              <div
                key={id}
                className="bg-white rounded shadow-sm p-4 flex items-center gap-6"
              >
                {/* PRODUCT IMAGE */}
                <img
                  src={item?.image || "/placeholder.png"}
                  alt={item?.name || "Product image"}
                  onClick={() => navigate(`/order/${id}`, { state: { item } })}
                  className="w-20 h-20 object-contain border rounded cursor-pointer"
                />

                {/* DETAILS */}
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800">
                    {item?.name ?? "Product"}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {item?.color ?? "Color"}, Size {item?.size ?? "8"}
                  </p>
                </div>

                {/* PRICE */}
                <div className="w-28 text-right font-semibold">
                  {formatINR(price * qty)}
                </div>

                {/* STATUS */}
                <div className="w-64">
                  <div
                    className={`flex items-center gap-2 font-medium ${
                      status === "Cancelled" ? "text-red-600" : "text-green-600"
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full ${
                        status === "Cancelled" ? "bg-red-600" : "bg-green-600"
                      }`}
                    ></span>
                    {status}
                  </div>

                  <p className="text-sm text-gray-500 mt-1">
                    {status === "Delivered"
                      ? `Delivered on ${getOrderDateText(item)}`
                      : `Your item has been ${status.toLowerCase()}`}
                  </p>

                  {status === "Delivered" && (
                    <button
                      onClick={() => navigate(`/order/${id}`, { state: { item } })}
                      className="mt-2 text-green-600 font-medium hover:underline"
                      type="button"
                    >
                      ⭐ Rate &amp; Review Product
                    </button>
                  )}
                </div>
              </div>
            );
          })}

          {filteredOrders.length === 0 && (
            <div className="text-center text-gray-500 mt-10">
              No matching orders found
            </div>
          )}
          
<button
  onClick={() => navigate("/")}
  className="px-6 py-3 border rounded text-green-500 hover:bg-red-50"
  style={{
    position: "fixed",   // Take it out of normal flow
    bottom: "20px",      // Distance from bottom
    right: "20px",   
    background:"green" ,
    color:"white"   // Distance from right
  }}
>
  Continue Shopping
</button>

        </div>
      </div>
    </div>
    </>
  );
}
