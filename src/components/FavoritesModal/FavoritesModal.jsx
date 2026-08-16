import React from 'react';
import { useCart } from '../../context/CartContext';
import { FOOD_ITEMS } from '../../data/foods';
import { formatCurrency } from '../../utils/formatters';
import './FavoritesModal.css';

export const FavoritesModal = ({ isOpen, onClose, onSelectFood }) => {
  const { favorites, toggleFavorite, addToCart } = useCart();

  if (!isOpen) return null;

  const favoriteFoods = FOOD_ITEMS.filter(f => favorites.includes(f.id));

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="fav-modal-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="fav-header">
          <div className="fav-title-wrap">
            <span className="fav-icon">❤️</span>
            <h3>Món Ăn Yêu Thích Của Bạn</h3>
            <span className="fav-badge">({favoriteFoods.length})</span>
          </div>
          <button className="fav-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="fav-body">
          {favoriteFoods.length === 0 ? (
            <div className="empty-fav-state">
              <div className="empty-fav-icon">💔</div>
              <h4>Chưa có món ăn yêu thích nào</h4>
              <p>Hãy bấm vào biểu tượng trái tim trên các món ăn bạn yêu thích để xem lại sau nhé!</p>
            </div>
          ) : (
            <div className="fav-items-grid">
              {favoriteFoods.map((food) => (
                <div key={food.id} className="fav-item-card" onClick={() => { onSelectFood(food); onClose(); }}>
                  <img src={food.image} alt={food.name} className="fav-item-img" />
                  
                  <div className="fav-item-info">
                    <h4 className="fav-item-title">{food.name}</h4>
                    <span className="fav-item-price">{formatCurrency(food.price)}</span>
                    <span className="fav-item-rating">⭐ {food.rating} ({food.reviewsCount})</span>
                  </div>

                  <div className="fav-actions" onClick={(e) => e.stopPropagation()}>
                    <button
                      className="btn-fav-add"
                      onClick={() => {
                        addToCart(food);
                      }}
                      title="Thêm vào giỏ"
                    >
                      + Thêm
                    </button>
                    <button
                      className="btn-fav-remove"
                      onClick={() => toggleFavorite(food.id)}
                      title="Bỏ yêu thích"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
