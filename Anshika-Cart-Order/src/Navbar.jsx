
import { FaShoppingCart, FaUserCircle, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import "./navbar.css";

export default function Navbar({ searchValue, onSearch }) {
  // ✅ Get cart items from Redux (fallback to empty array)
  const items = useSelector((state) => state.cart?.items ?? []);

  // ✅ Calculate total quantity
  const totalQty = items.reduce((sum, item) => sum + (item?.qty ?? 0), 0);

  return (
    <header className="navbar">
      {/* BRAND LOGO */}
      <div className="brand">
        <span className="brand-main">Medi</span>
        <span className="brand-accent">Cart</span>
        <div className="brand-underline" />
      </div>

      {/* SEARCH */}
      <div className="navbar-search">
        <FaSearch className="search-icon" aria-hidden="true" />
        <input
          type="text"
          placeholder="Search medicines, tablets, syrups, injections"
          value={searchValue}
          onChange={(e) => onSearch?.(e.target.value)}
          aria-label="Search medicines"
        />
      </div>

      {/* ACTIONS */}
      <div className="navbar-actions">
        <button className="cart-wrapper" type="button" aria-label="Open cart">
          <FaShoppingCart size={20} aria-hidden="true" />
          {/* 🔴 Show badge ONLY if items exist */}
          {totalQty > 0 && <span className="cart-count">{totalQty}</span>}
        </button>

        <button
          type="button"
          className="profile-icon"
          aria-label="Open profile"
          title="Profile"
        >
          <FaUserCircle size={26} />
        </button>
      </div>
    </header>
  );
}
