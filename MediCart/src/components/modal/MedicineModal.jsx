import { useEffect, useState } from "react";
import { FaCartPlus, FaTimes, FaPlus, FaMinus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  incrementQty,
  decrementQty,
} from "../../components/cart/cartSlice";
import "./medicineModal.css";

export default function MedicineModal({ product, onClose }) {
  const dispatch = useDispatch();
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  const cartItem = useSelector((state) =>
    state.cart.items.find((i) => i.product.id === product?.id)
  );

  useEffect(() => {
    if (!product) return;

    const cleanName = product.name
      .replace(/\d+mg|\d+ ml/gi, "")
      .trim();

    setLoading(true);

    fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
        cleanName
      )}`
    )
      .then((res) => res.json())
      .then((data) => {
        setInfo(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [product]);

  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE */}
        <button className="close-btn" onClick={onClose}>
          <FaTimes />
        </button>

        <h2>{product.name}</h2>
        <p className="category">{product.category}</p>
        <p className="price">₹ {product.price}</p>

        {loading && <p>Loading details…</p>}

        {!loading && (
          <div className="details">
            <p>
              {info?.extract ||
                "No detailed medical description available."}
            </p>
          </div>
        )}

        {/* CART ACTIONS */}
        {product.inStock ? (
          cartItem ? (
            <div className="modal-qty">
              <button
                className="qty-btn"
                onClick={() => dispatch(decrementQty(product.id))}
              >
                <FaMinus />
              </button>

              <span className="qty-count">{cartItem.qty}</span>

              <button
                className="qty-btn"
                onClick={() => dispatch(incrementQty(product.id))}
              >
                <FaPlus />
              </button>
            </div>
          ) : (
            <button
              className="add-cart-btn"
              onClick={() => dispatch(addToCart(product))}
            >
              <FaCartPlus />
              <span>Add to Cart</span>
            </button>
          )
        ) : (
          <div className="out-of-stock">Out of Stock</div>
        )}
      </div>
    </div>
  );
}
