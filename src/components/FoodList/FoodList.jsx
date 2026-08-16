import React from 'react';
import { FoodCard } from '../FoodCard/FoodCard';
import './FoodList.css';

export const FoodList = ({ foods, onSelectFood, onResetFilters, searchQuery }) => {
  return (
    <section className="food-list-section">
      <div className="food-list-container">
        {/* List Header */}
        <div className="food-list-header">
          <div className="header-info">
            <h2 className="section-title">
              {searchQuery ? `Kết quả tìm kiếm cho "${searchQuery}"` : 'Thực Đơn Nổi Bật'}
            </h2>
            <span className="items-count">({foods.length} món ăn)</span>
          </div>
        </div>

        {/* Food Grid */}
        {foods.length > 0 ? (
          <div className="food-grid">
            {foods.map((food) => (
              <FoodCard
                key={food.id}
                food={food}
                onSelectFood={onSelectFood}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="empty-food-state">
            <div className="empty-icon">🔍</div>
            <h3>Không tìm thấy món ăn phù hợp</h3>
            <p>Hãy thử tìm kiếm với từ khóa khác hoặc xóa bớt các bộ lọc danh mục.</p>
            <button className="reset-filters-btn" onClick={onResetFilters}>
              Xem tất cả thực đơn
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
