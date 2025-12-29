import { FaShoppingCart, FaUserCircle, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import "./navbar.css";

export default function Navbar({ searchValue, onSearch }) {
  // ✅ Get cart items from Redux
  const items = useSelector((state) => state.cart.items);

  // ✅ Calculate total quantity
  const totalQty = items.reduce((sum, item) => sum + item.qty, 0);

  // ✅ State for profile menu
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  // ✅ Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="navbar">
      {/* BRAND LOGO */}
      <div className="brand">
        <div className="brand-text">
          <span className="brand-main">Medi</span>
          <span className="brand-accent">Cart</span>
        </div>
        <div className="brand-underline" />
      </div>

      {/* SEARCH */}
      <div className="navbar-search">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search medicines, tablets, syrups, injections"
          value={searchValue}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      {/* ACTIONS */}
      <div className="navbar-actions">
        <div className="cart-wrapper">
          <FaShoppingCart size={20} />
          {totalQty > 0 && <span className="cart-count">{totalQty}</span>}
        </div>

        {/* USER PROFILE */}
        <div className="profile-wrapper" ref={menuRef}>
          <FaUserCircle
            size={26}
            className="profile-icon"
            onClick={() => setShowMenu(!showMenu)}
          />

          {/* Dropdown Menu */}
          {showMenu && (
            <div className="profile-menu">
              <ul>
                <li>Orders</li>
                <li>Account</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
