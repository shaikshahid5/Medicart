import { MEDICINE_ICONS } from "./medicineIcons";
import { FaInfoCircle, FaCartPlus, FaPlus, FaMinus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, incrementQty, decrementQty } from "../../components/cart/cartSlice";
import "./product-card.css";

export default function ProductCard({ product, onViewMore }) {
  const dispatch = useDispatch();
  const cartItem = useSelector((state) =>
    state.cart.items.find((i) => i.product.id === product.id)
  );

  const categoryKey = product.category?.trim();
  const Icon = MEDICINE_ICONS[categoryKey] || MEDICINE_ICONS.Tablet;

  return (
    <div className="card">
      {/* Icon */}
      <div className="card-header">
        <div className="icon-wrap">
          <Icon size={42} />
        </div>
      </div>

      {/* Body */}
      <div className="card-body">
        <h3 className="product-name">{product.name}</h3>
        <p className="price">₹ {product.price}</p>
      </div>

      {/* Footer / Actions */}
      <div className="card-footer">
        {product.inStock ? (
          cartItem ? (
            <div className="qty-controls">
              <button onClick={() => dispatch(decrementQty(product.id))}>
                <FaMinus />
              </button>
              <span>{cartItem.qty}</span>
              <button onClick={() => dispatch(incrementQty(product.id))}>
                <FaPlus />
              </button>
            </div>
          ) : (
            <div className="card-actions">
              <button
                className="btn-cart"
                onClick={() => dispatch(addToCart(product))}
              >
                <FaCartPlus size={14} />
                <span>Buy Now</span>
              </button>

              <button
                className="btn-outline"
                onClick={() => onViewMore(product)}
              >
                <FaInfoCircle size={14} />
                <span>View More</span>
              </button>
            </div>
          )
        ) : (
          <div className="out-of-stock">Out of Stock</div>
        )}
      </div>
    </div>
  );
}
