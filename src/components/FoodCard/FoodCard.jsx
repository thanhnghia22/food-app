import React from 'react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatters';
import './FoodCard.css';

export const FoodCard = ({ food, onSelectFood }) => {
  const { isFavorite, toggleFavorite, addToCart } = useCart();
  const favorited = isFavorite(food.id);

  const handleQuickAdd = (e) => {
    e.stopPropagation();
    // If food has toppings or multiple sizes, open modal so user can customize; else add directly
    if (food.toppings && food.toppings.length > 0) {
      onSelectFood(food);
    } else {
      addToCart(food, {
        size: food.sizes ? food.sizes[0] : null,
        toppings: [],
        quantity: 1
      });
    }
  };

  return (
    <div className="food-card" onClick={() => onSelectFood(food)}>
      {/* Image Wrap */}
      <div className="food-card-img-wrap">
        <img
          src={food.image}
          alt={food.name}
          loading="lazy"
          className="food-card-img"
        />

        {/* Favorite Button */}
        <button
          className={`favorite-btn ${favorited ? 'favorited' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(food.id);
          }}
          title={favorited ? 'Bỏ yêu thích' : 'Yêu thích món này'}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={favorited ? '#ef4444' : 'none'} stroke={favorited ? '#ef4444' : 'currentColor'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>

        {/* Badges */}
        <div className="food-badge-list">
          {food.isPopular && <span className="food-badge badge-popular">🔥 Best Seller</span>}
          {food.oldPrice && (
            <span className="food-badge badge-sale">
              -{Math.round(((food.oldPrice - food.price) / food.oldPrice) * 100)}%
            </span>
          )}
          {food.isNew && <span className="food-badge badge-new">Mới ✨</span>}
        </div>

        {/* Prep Time Pill */}
        <div className="food-prep-pill">
          <span>⏱ {food.prepTime}</span>
        </div>
      </div>

      {/* Card Content */}
      <div className="food-card-body">
        <div className="food-card-rating">
          <span className="star-icon">⭐</span>
          <span className="rating-score">{food.rating}</span>
          <span className="rating-count">({food.reviewsCount})</span>
        </div>

        <h3 className="food-card-title">{food.name}</h3>

        <p className="food-card-desc">{food.description}</p>

        {/* Price & Action */}
        <div className="food-card-footer">
          <div className="food-price-wrap">
            <span className="current-price">{formatCurrency(food.price)}</span>
            {food.oldPrice && (
              <span className="old-price">{formatCurrency(food.oldPrice)}</span>
            )}
          </div>

          <button
            className="add-cart-btn"
            onClick={handleQuickAdd}
            title="Thêm vào giỏ"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            <span>{food.toppings?.length > 0 ? 'Tùy chọn' : 'Thêm'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
