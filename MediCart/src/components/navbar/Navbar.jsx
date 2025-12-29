import { FaShoppingCart, FaUserCircle, FaSearch } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useState, useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import "./navbar.css";

export default function Navbar({ searchValue, onSearch }) {
  const items = useSelector((state) => (state?.cart?.items ?? []));
  const totalQty = items.reduce((sum, item) => sum + (item?.qty || 0), 0);

  return (
    <header className="navbar">
      {/* BRAND LOGO */}
      <div className="brand">
        <div className="brand-text">
          <span className="brand-main">Medi</span>{" "}
          <span className="brand-accent">Cart</span>
          <div className="brand-underline" />
        </div>
        <div className="brand-underline" />
      </div>

      {/* SEARCH */}
      <div className="navbar-search">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search medicines, tablets, syrups, injections"
          value={searchValue || ""}
          onChange={(e) => onSearch && onSearch(e.target.value)}
        />
      </div>

      {/* ACTIONS */}
      <div className="navbar-actions">
        <div className="cart-wrapper">
          <FaShoppingCart size={20} />
          {totalQty > 0 && <span className="cart-count">{totalQty}</span>}
        </div>

        {/* USER PROFILE */}
        <div className="profile-wrapper">
          <Link to={"/dashboard/client"}>
            <FaUserCircle
              size={26}
              className="profile-icon"
            />
          </Link>
        </div>

        {/* Auth buttons inserted after profile-icon */}
        <div className="d-flex gap-3">
          <NavLink to="login" className={`btn btn-outline-success`}> Login </NavLink>
          <NavLink to="register" className={`btn btn-outline-success`}> Register </NavLink>
        </div>
      </div>
    </header>
  );
}
