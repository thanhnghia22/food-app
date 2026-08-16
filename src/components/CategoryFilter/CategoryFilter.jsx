import React from 'react';
import { CATEGORIES } from '../../data/foods';
import './CategoryFilter.css';

export const CategoryFilter = ({
  activeCategory,
  onSelectCategory,
  sortBy,
  onSelectSort,
  filterTag,
  onSelectTag
}) => {
  const tags = [
    { id: 'all', label: 'Tất cả tags' },
    { id: 'best-seller', label: '🔥 Best Seller' },
    { id: 'discount', label: '🏷️ Giảm giá' },
    { id: 'new', label: '🌟 Mới nhất' }
  ];

  return (
    <div className="category-filter-section" id="menu-section">
      <div className="filter-container">
        {/* Category Pills Bar */}
        <div className="category-scroll-wrapper">
          <div className="category-pills">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  className={`category-pill-btn ${isActive ? 'active' : ''}`}
                  onClick={() => onSelectCategory(cat.id)}
                >
                  <span className="cat-icon">{cat.icon}</span>
                  <span className="cat-name">{cat.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Secondary Bar: Tags & Sorting */}
        <div className="secondary-filter-bar">
          {/* Quick Tags */}
          <div className="tag-filter-group">
            {tags.map(tag => (
              <button
                key={tag.id}
                className={`tag-chip ${filterTag === tag.id ? 'active' : ''}`}
                onClick={() => onSelectTag(tag.id)}
              >
                {tag.label}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="sort-dropdown-wrap">
            <span className="sort-label">Sắp xếp:</span>
            <select
              className="sort-select"
              value={sortBy}
              onChange={(e) => onSelectSort(e.target.value)}
            >
              <option value="default">Phổ biến nhất</option>
              <option value="price-asc">Giá: Thấp đến Cao</option>
              <option value="price-desc">Giá: Cao đến Thấp</option>
              <option value="rating">Đánh giá cao nhất (⭐)</option>
              <option value="name">Tên A-Z</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
