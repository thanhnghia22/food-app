import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatters';
import confetti from 'canvas-confetti';
import './CheckoutModal.css';

export const CheckoutModal = ({ isOpen, onClose, onOrderSuccess }) => {
  const { cart, grandTotal, subtotal, finalDeliveryFee, discountAmount, appliedVoucher, createOrder, showToast } = useCart();

  const [fullName, setFullName] = useState('Nguyễn Văn An');
  const [phoneNumber, setPhoneNumber] = useState('0987654321');
  const [address, setAddress] = useState('123 Đường Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh');
  const [deliveryNote, setDeliveryNote] = useState('Gọi trước khi giao hàng');
  const [paymentMethod, setPaymentMethod] = useState('cod'); // 'cod' | 'qr' | 'card'
  const [deliveryTimeOption, setDeliveryTimeOption] = useState('asap'); // 'asap' | 'scheduled'

  if (!isOpen) return null;

  const handleSubmitOrder = (e) => {
    e.preventDefault();

    if (!fullName.trim() || !phoneNumber.trim() || !address.trim()) {
      showToast('Vui lòng điền đầy đủ Tên, SĐT và Địa chỉ giao hàng!', 'error');
      return;
    }

    const customerInfo = {
      fullName,
      phoneNumber,
      address,
      deliveryNote,
      deliveryTimeOption
    };

    const newOrder = createOrder(customerInfo, paymentMethod);

    // Fire festive confetti animation
    try {
      if (typeof confetti === 'function') {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      }
    } catch {
      // fallback if confetti not loaded
    }

    showToast('🎉 Đặt hàng thành công! Đơn hàng đang được xử lý.');
    onClose();
    onOrderSuccess(newOrder);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="checkout-modal-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="checkout-header">
          <div className="checkout-title-wrap">
            <span className="checkout-icon">🛍️</span>
            <h3>Xác Nhận Đơn Hàng & Thanh Toán</h3>
          </div>
          <button className="checkout-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Form Content */}
        <form className="checkout-form" onSubmit={handleSubmitOrder}>
          <div className="checkout-body-grid">
            {/* Left Col: Customer & Shipping Details */}
            <div className="checkout-col">
              <h4 className="section-subtitle">📍 Thông tin nhận hàng</h4>

              <div className="form-group">
                <label>Họ và tên người nhận *</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn An"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Số điện thoại liên hệ *</label>
                <input
                  type="tel"
                  required
                  placeholder="Ví dụ: 0987654321"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Địa chỉ giao hàng chi tiết *</label>
                <textarea
                  rows="2"
                  required
                  placeholder="Số nhà, tên đường, phường/xã, quận/huyện..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                ></textarea>
              </div>

              <div className="form-group">
                <label>Ghi chú cho shipper</label>
                <input
                  type="text"
                  placeholder="Ví dụ: Bấm chuông tầng 2, gửi bác bảo vệ..."
                  value={deliveryNote}
                  onChange={(e) => setDeliveryNote(e.target.value)}
                />
              </div>

              {/* Delivery Timing */}
              <div className="form-group">
                <label>Thời gian giao hàng</label>
                <div className="radio-options-row">
                  <label className={`radio-pill ${deliveryTimeOption === 'asap' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="delivery-time"
                      checked={deliveryTimeOption === 'asap'}
                      onChange={() => setDeliveryTimeOption('asap')}
                    />
                    <span>⚡ Càng sớm càng tốt (~20 phút)</span>
                  </label>
                  <label className={`radio-pill ${deliveryTimeOption === 'scheduled' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="delivery-time"
                      checked={deliveryTimeOption === 'scheduled'}
                      onChange={() => setDeliveryTimeOption('scheduled')}
                    />
                    <span>⏱ Giao trong 1 giờ tới</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Right Col: Payment Method & Order Summary */}
            <div className="checkout-col">
              <h4 className="section-subtitle">💳 Phương thức thanh toán</h4>

              <div className="payment-methods-list">
                <label className={`payment-method-card ${paymentMethod === 'cod' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="payment-method"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                  />
                  <span className="pay-icon">💵</span>
                  <div className="pay-details">
                    <strong>Tiền mặt khi nhận hàng (COD)</strong>
                    <span>Thanh toán trực tiếp cho shipper khi nhận món ăn</span>
                  </div>
                </label>

                <label className={`payment-method-card ${paymentMethod === 'qr' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="payment-method"
                    checked={paymentMethod === 'qr'}
                    onChange={() => setPaymentMethod('qr')}
                  />
                  <span className="pay-icon">📱</span>
                  <div className="pay-details">
                    <strong>Chuyển khoản / Quét mã QR Napas 24/7</strong>
                    <span>Hỗ trợ mọi app ngân hàng (Vietcombank, MB, Techcombank, MoMo)</span>
                  </div>
                </label>

                {/* QR Code preview if selected */}
                {paymentMethod === 'qr' && (
                  <div className="qr-preview-box">
                    <div className="qr-code-mock">
                      <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=YUMFOOD-PAYMENT-2026"
                        alt="QR Code Payment"
                        className="qr-img"
                      />
                    </div>
                    <div className="qr-guide">
                      <p><strong>Quét mã QR để thanh toán</strong></p>
                      <p className="qr-amount">{formatCurrency(grandTotal)}</p>
                      <span className="qr-note">Nội dung: YUMFOOD [SĐT]</span>
                    </div>
                  </div>
                )}

                <label className={`payment-method-card ${paymentMethod === 'card' ? 'active' : ''}`}>
                  <input
                    type="radio"
                    name="payment-method"
                    checked={paymentMethod === 'card'}
                    onChange={() => setPaymentMethod('card')}
                  />
                  <span className="pay-icon">💳</span>
                  <div className="pay-details">
                    <strong>Thẻ ATM Quốc tế / Visa / Mastercard</strong>
                    <span>Cổng thanh toán bảo mật 100% qua chuẩn PCI DSS</span>
                  </div>
                </label>
              </div>

              {/* Mini Summary */}
              <div className="checkout-summary-card">
                <div className="summary-row">
                  <span>Món đã chọn ({cart.length} món):</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="summary-row">
                  <span>Phí giao hàng:</span>
                  <span>{formatCurrency(finalDeliveryFee)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="summary-row discount">
                    <span>Mã giảm giá ({appliedVoucher?.code}):</span>
                    <span>-{formatCurrency(discountAmount)}</span>
                  </div>
                )}
                <div className="summary-divider"></div>
                <div className="summary-row total">
                  <span>Tổng tiền thanh toán:</span>
                  <span className="total-price-highlight">{formatCurrency(grandTotal)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Checkout Submit Bar */}
          <div className="checkout-footer-bar">
            <button type="button" className="btn-cancel-checkout" onClick={onClose}>
              Quay lại giỏ hàng
            </button>
            <button type="submit" className="btn-submit-order">
              <span>Xác Nhận Đặt Món Ngay</span>
              <span className="order-total-tag">{formatCurrency(grandTotal)}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
