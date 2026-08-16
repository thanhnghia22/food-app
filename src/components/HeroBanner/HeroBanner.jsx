import React from 'react';
import { useCart } from '../../context/CartContext';
import './HeroBanner.css';

export const HeroBanner = ({ onExploreMenu, onSelectFood }) => {
  const { applyVoucher, showToast } = useCart();

  const handleCopyCode = (code) => {
    navigator.clipboard?.writeText(code);
    applyVoucher(code);
  };

  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Left Column: Headline & Action */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-flame">🔥</span>
            <span>Ưu đãi ẩm thực hôm nay</span>
          </div>

          <h1 className="hero-title">
            Thưởng Thức <span className="highlight-text">Món Ngon</span> Tận Cửa Trong 20 Phút!
          </h1>

          <p className="hero-subtitle">
            Hàng trăm món ăn Việt Nam truyền thống & quốc tế hảo hạng, nguyên liệu tươi ngon mỗi ngày, giao hàng nóng hổi tới bạn.
          </p>

          {/* CTAs */}
          <div className="hero-cta-group">
            <button className="btn-primary-hero" onClick={onExploreMenu}>
              <span>Khám phá thực đơn</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-num">500+</span>
                <span className="stat-label">Món ngon</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-num">4.9 ★</span>
                <span className="stat-label">Hài lòng</span>
              </div>
              <div className="stat-divider"></div>
              <div className="stat-item">
                <span className="stat-num">&lt;20m</span>
                <span className="stat-label">Giao nhanh</span>
              </div>
            </div>
          </div>

          {/* Promo Vouchers Mini Bar */}
          <div className="hero-vouchers">
            <span className="vouchers-title">Mã giảm giá hot:</span>
            <div className="voucher-tags">
              <button
                className="voucher-tag"
                onClick={() => handleCopyCode('FREESHIP')}
                title="Bấm để áp dụng ngay"
              >
                🏷️ FREESHIP <span>(Free ship 15k)</span>
              </button>
              <button
                className="voucher-tag"
                onClick={() => handleCopyCode('YUM20')}
                title="Bấm để áp dụng ngay"
              >
                🏷️ YUM20 <span>(Giảm 20%)</span>
              </button>
              <button
                className="voucher-tag"
                onClick={() => handleCopyCode('BANMOI')}
                title="Bấm để áp dụng ngay"
              >
                🏷️ BANMOI <span>(Giảm 25k)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual Showcase */}
        <div className="hero-visual">
          <div className="hero-card-featured">
            <div className="hero-img-wrap">
              <img
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=700&auto=format&fit=crop&q=80"
                alt="Burger Bò Nướng"
              />
              <div className="floating-badge-top">
                <span>🔥 Món bán chạy nhất</span>
              </div>
            </div>

            <div className="featured-info">
              <div className="featured-header">
                <h4>Burger Bò Nướng Phô Mai</h4>
                <span className="featured-price">79.000 ₫</span>
              </div>
              <p className="featured-desc">Thịt bò Úc nướng than hoa kẹp phô mai kép béo ngậy</p>
              <div className="featured-footer">
                <span className="rating-pill">⭐ 4.8 (245 đánh giá)</span>
                <span className="time-pill">⏱ 20 phút</span>
              </div>
            </div>
          </div>

          {/* Floating mini trust cards */}
          <div className="floating-card float-left">
            <div className="float-icon">🛵</div>
            <div className="float-text">
              <strong>Freeship 0đ</strong>
              <span>Cho đơn từ 300k</span>
            </div>
          </div>

          <div className="floating-card float-right">
            <div className="float-icon">🥗</div>
            <div className="float-text">
              <strong>Tươi ngon 100%</strong>
              <span>Chuẩn an toàn VSTP</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
