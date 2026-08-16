import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

export const Navbar = ({
  searchQuery,
  setSearchQuery,
  onOpenCart,
  onOpenOrders,
  onOpenFavorites
}) => {
  const { totalItemsCount, favorites, orders } = useCart();
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  return (
    <header className="navbar-container">
      <div className="navbar-inner">
        {/* Brand Logo */}
        <div className="navbar-brand">
          <div className="brand-logo-icon">🍜</div>
          <div className="brand-text">
            <span className="brand-name">Yum<span className="brand-highlight">Food</span></span>
            <span className="brand-tagline">Giao nhanh 20 phút</span>
          </div>
        </div>

        {/* Search Bar */}
        <div className={`navbar-search ${isSearchFocused ? 'focused' : ''}`}>
          <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Tìm kiếm món ăn, đồ uống, gà rán, phở..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setIsSearchFocused(true)}
            onBlur={() => setIsSearchFocused(false)}
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
              ✕
            </button>
          )}
        </div>

        {/* Action Buttons */}
        <div className="navbar-actions">
          {/* Favorites Button */}
          <button
            className="nav-action-btn"
            onClick={onOpenFavorites}
            title="Món ăn yêu thích"
          >
            <div className="icon-wrapper">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              {favorites.length > 0 && (
                <span className="badge badge-fav">{favorites.length}</span>
              )}
            </div>
            <span className="btn-label">Yêu thích</span>
          </button>

          {/* Orders History Button */}
          <button
            className="nav-action-btn"
            onClick={onOpenOrders}
            title="Lịch sử đơn hàng"
          >
            <div className="icon-wrapper">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
              {orders.length > 0 && (
                <span className="badge badge-orders">{orders.length}</span>
              )}
            </div>
            <span className="btn-label">Đơn hàng</span>
          </button>

          {/* Cart Trigger Button */}
          <button
            className="nav-cart-btn"
            onClick={onOpenCart}
            title="Giỏ hàng của bạn"
          >
            <div className="cart-icon-box">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {totalItemsCount > 0 && (
                <span className="cart-badge-bounce">{totalItemsCount}</span>
              )}
            </div>
            <span className="cart-btn-text">Giỏ hàng</span>
          </button>
        </div>
      </div>
    </header>
  );
};
