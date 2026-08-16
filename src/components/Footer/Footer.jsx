import React from 'react';
import './Footer.css';

export const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-inner">
        {/* Brand Column */}
        <div className="footer-col brand-col">
          <div className="footer-brand">
            <span className="footer-logo">🍜</span>
            <span className="footer-brand-name">Yum<span className="highlight">Food</span></span>
          </div>
          <p className="footer-desc">
            Ứng dụng đặt món ăn trực tuyến nhanh chóng, mang hương vị tươi ngon đến tận nhà bạn chỉ trong 20 phút.
          </p>
          <div className="footer-hotline">
            <span className="hotline-icon">📞</span>
            <div>
              <span className="hotline-label">Tổng đài CSKH (24/7):</span>
              <strong className="hotline-num">1900 8888</strong>
            </div>
          </div>
        </div>

        {/* Categories Link */}
        <div className="footer-col">
          <h4 className="footer-heading">Khám Phá Món Ăn</h4>
          <ul className="footer-links">
            <li><a href="#menu-section">Món chính & Cơm phần</a></li>
            <li><a href="#menu-section">Burger & Pizza thơm lừng</a></li>
            <li><a href="#menu-section">Trà sữa & Cà phê phin</a></li>
            <li><a href="#menu-section">Món ăn vặt đường phố</a></li>
            <li><a href="#menu-section">Healthy & Eat Clean</a></li>
          </ul>
        </div>

        {/* Policies */}
        <div className="footer-col">
          <h4 className="footer-heading">Chính Sách & Hỗ Trợ</h4>
          <ul className="footer-links">
            <li><a href="#">Quy định giao hàng trong 20 phút</a></li>
            <li><a href="#">Chính sách hoàn tiền & đổi trả</a></li>
            <li><a href="#">Bảo mật thông tin khách hàng</a></li>
            <li><a href="#">Đăng ký làm đối tác nhà hàng</a></li>
            <li><a href="#">Trở thành tài xế YumFood</a></li>
          </ul>
        </div>

        {/* App Download / Time */}
        <div className="footer-col">
          <h4 className="footer-heading">Thời Gian Phục Vụ</h4>
          <div className="operating-hours">
            <p>⏰ <strong>06:00 - 23:30</strong></p>
            <span>Áp dụng tất cả các ngày trong tuần, kể cả ngày lễ Tết.</span>
          </div>

          <div className="payment-badges">
            <span className="badge-tag">💵 COD</span>
            <span className="badge-tag">📱 MoMo / QR</span>
            <span className="badge-tag">💳 Visa / Master</span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2026 YumFood Delivery. Bản quyền thuộc về Dự án Web Bán Đồ Ăn (React + CSS).</p>
      </div>
    </footer>
  );
};
