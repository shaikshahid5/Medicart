import { useContext } from "react";
import { CartContext } from "./Content/CartContent.jsx";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const { cart, removeFromCart, increaseQty, decreaseQty } =
    useContext(CartContext);

  const navigate = useNavigate();

  const totalMRP = cart.reduce(
    (sum, item) => sum + item.mrp * item.qty,
    0
  );

  const totalPayable = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const totalSaved = totalMRP - totalPayable;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT SECTION – CART ITEMS */}
        <div className="lg:col-span-2 bg-white rounded shadow p-5">
          <h2 className="text-xl font-semibold mb-4">Cart</h2>

          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => {
                const itemSaved =
                  (item.mrp - item.price) * item.qty;

                const discountPercent = Math.round(
                  ((item.mrp - item.price) / item.mrp) * 100
                );

                return (
                  <div
                    key={item.id}
                    className="flex gap-4 border-b pb-4"
                  >
                    {/* PRODUCT IMAGE */}
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-contain"
                    />

                    {/* PRODUCT DETAILS */}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-800">
                        {item.name}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {item.qty} Unit{item.qty > 1 ? "s" : ""} / pack
                        &nbsp; | &nbsp; MRP ₹{item.mrp}
                      </p>

                      <p className="mt-1 text-sm">
                        <span className="line-through text-gray-400">
                          ₹{item.mrp}
                        </span>
                        <span className="font-semibold ml-2 text-gray-800">
                          ₹{item.price}
                        </span>
                      </p>

                      {/* QTY CONTROLS */}
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() => decreaseQty(item.id)}
                          className="px-3 py-1 border rounded hover:bg-gray-100"
                        >
                          −
                        </button>

                        <span className="font-semibold">
                          {item.qty}
                        </span>

                        <button
                          onClick={() => increaseQty(item.id)}
                          className="px-3 py-1 border rounded hover:bg-gray-100"
                        >
                          +
                        </button>

                        <span className="text-sm text-gray-500">
                          {item.qty} Unit{item.qty > 1 ? "s" : ""}
                        </span>
                      </div>

                      {/* OFFER DETAILS */}
                      {itemSaved > 0 && (
                        <p className="text-green-600 text-sm mt-2">
                          ✅ Offer Applied: {discountPercent}% Off • You saved ₹
                          {itemSaved}
                        </p>
                      )}
                    </div>

                    {/* RIGHT SECTION */}
                    <div className="flex flex-col items-end justify-between">
                      <span className="font-semibold text-lg">
                        ₹{item.price * item.qty}
                      </span>

                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="flex items-center gap-1 text-green-500 border border-greeen-500 px-4 py-1 rounded text-sm hover:bg-red-50"
                      >
                        🗑 Remove
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* RIGHT SECTION – CART SUMMARY */}
        <div className="bg-white rounded shadow p-5 h-fit">
          <h2 className="text-lg font-semibold mb-4">
            Cart Summary
          </h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>No. of Items</span>
              <span>{cart.length}</span>
            </div>

            <div className="flex justify-between">
              <span>MRP Total</span>
              <span>₹{totalMRP}</span>
            </div>

            <div className="flex justify-between text-green-600">
              <span>Total Saved</span>
              <span>₹{totalSaved}</span>
            </div>

            <hr />

            <div className="flex justify-between font-semibold text-lg">
              <span>Total to Pay</span>
              <span>₹{totalPayable}</span>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM ACTION BUTTONS */}
      <div className="max-w-7xl mx-auto mt-6 flex justify-end gap-4">
       

 <button
  onClick={() => navigate("/track-order", { state: { cart } })}
  className="px-8 py-3 bg-green-500 text-white rounded font-semibold hover:bg-green-600"
>
  Proceed
</button>




      </div>
    </div>
  );
}
