import { FaShoppingCart, FaUserCircle, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import "./navbar.css";

export default function Navbar({ searchValue, onSearch }) {
  // ✅ Get cart items from Redux
  const items = useSelector((state) => state.cart.items);

  // ✅ Calculate total quantity
  const totalQty = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <header className="navbar">
      {/* BRAND LOGO */}
      <div className="brand">
        <span className="brand-main">Medi</span>
        <span className="brand-accent">Cart</span>
        <div className="brand-underline" />
      </div>

      {/* SEARCH */}
      {/* <div className="navbar-search">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search medicines, tablets, syrups, injections"
          value={searchValue}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div> */}

      {/* ACTIONS */}
      <div className="navbar-actions">
        <div className="cart-wrapper">
          <FaShoppingCart size={20} />

          {/* 🔴 Show badge ONLY if items exist */}
          {totalQty > 0 && (
            <span className="cart-count">{totalQty}</span>
          )}
        </div>

        <FaUserCircle size={26} className="profile-icon" />
      </div>
    </header>
  );
}
