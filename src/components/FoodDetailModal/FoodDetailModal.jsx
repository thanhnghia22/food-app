import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatters';
import './FoodDetailModal.css';

export const FoodDetailModal = ({ food, onClose }) => {
  const { addToCart, isFavorite, toggleFavorite } = useCart();

  const [selectedSize, setSelectedSize] = useState(
    food.sizes && food.sizes.length > 0 ? food.sizes[0] : null
  );
  const [selectedToppings, setSelectedToppings] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');

  if (!food) return null;

  const favorited = isFavorite(food.id);

  // Toggle Topping checkbox
  const handleToggleTopping = (topping) => {
    setSelectedToppings((prev) => {
      const exists = prev.some((t) => t.id === topping.id);
      if (exists) {
        return prev.filter((t) => t.id !== topping.id);
      } else {
        return [...prev, topping];
      }
    });
  };

  // Calculate Unit & Total Price
  const sizePrice = selectedSize ? selectedSize.priceModifier : 0;
  const toppingsPrice = selectedToppings.reduce((acc, t) => acc + t.price, 0);
  const unitPrice = food.price + sizePrice + toppingsPrice;
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart(food, {
      size: selectedSize,
      toppings: selectedToppings,
      note,
      quantity
    });
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-food-detail" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose}>
          ✕
        </button>

        {/* Modal Image */}
        <div className="modal-img-wrap">
          <img src={food.image} alt={food.name} />
          <button
            className={`modal-fav-btn ${favorited ? 'favorited' : ''}`}
            onClick={() => toggleFavorite(food.id)}
            title="Yêu thích"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill={favorited ? '#ef4444' : 'none'} stroke={favorited ? '#ef4444' : 'currentColor'} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="modal-body-content">
          <div className="modal-header-meta">
            <div className="modal-tags">
              {food.isPopular && <span className="modal-badge badge-pop">🔥 Best Seller</span>}
              <span className="modal-badge badge-time">⏱ {food.prepTime}</span>
              <span className="modal-badge badge-rate">⭐ {food.rating} ({food.reviewsCount})</span>
            </div>
            <h2 className="modal-food-title">{food.name}</h2>
            <p className="modal-food-desc">{food.description}</p>
          </div>

          {/* Size Options */}
          {food.sizes && food.sizes.length > 0 && (
            <div className="options-group">
              <h4 className="options-title">
                1. Chọn Kích Cỡ / Size <span className="required-text">(Bắt buộc)</span>
              </h4>
              <div className="size-options-list">
                {food.sizes.map((size, idx) => (
                  <label
                    key={idx}
                    className={`option-card-label ${selectedSize?.name === size.name ? 'selected' : ''}`}
                  >
                    <input
                      type="radio"
                      name="food-size"
                      checked={selectedSize?.name === size.name}
                      onChange={() => setSelectedSize(size)}
                    />
                    <span className="option-name">{size.name}</span>
                    <span className="option-price">
                      {size.priceModifier > 0 ? `+${formatCurrency(size.priceModifier)}` : 'Chuẩn'}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Toppings Options */}
          {food.toppings && food.toppings.length > 0 && (
            <div className="options-group">
              <h4 className="options-title">
                2. Chọn Thêm Topping <span className="optional-text">(Tùy chọn)</span>
              </h4>
              <div className="topping-options-list">
                {food.toppings.map((topping) => {
                  const isChecked = selectedToppings.some((t) => t.id === topping.id);
                  return (
                    <label
                      key={topping.id}
                      className={`option-card-label ${isChecked ? 'selected' : ''}`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleTopping(topping)}
                      />
                      <span className="option-name">{topping.name}</span>
                      <span className="option-price">+{formatCurrency(topping.price)}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          )}

          {/* Special Notes */}
          <div className="options-group">
            <h4 className="options-title">Ghi chú cho quán</h4>
            <input
              type="text"
              className="food-note-input"
              placeholder="Ví dụ: Ít cay, không lấy hành lá, để nước chấm riêng..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
        </div>

        {/* Modal Bottom Bar */}
        <div className="modal-bottom-bar">
          <div className="qty-picker">
            <button
              className="qty-btn"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={quantity <= 1}
            >
              −
            </button>
            <span className="qty-value">{quantity}</span>
            <button
              className="qty-btn"
              onClick={() => setQuantity((q) => q + 1)}
            >
              +
            </button>
          </div>

          <button className="btn-confirm-add" onClick={handleAddToCart}>
            <span>Thêm vào giỏ hàng</span>
            <span className="btn-price-tag">{formatCurrency(totalPrice)}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
