import React, { useState, useEffect } from 'react';
import { formatCurrency, formatDateTime } from '../../utils/formatters';
import './OrderStatusModal.css';

export const OrderStatusModal = ({ order, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1); // 1: Received, 2: Cooking, 3: Delivering, 4: Done

  useEffect(() => {
    if (!order) return;

    // Simulate progress timeline
    const timer1 = setTimeout(() => setCurrentStep(2), 5000);
    const timer2 = setTimeout(() => setCurrentStep(3), 12000);
    const timer3 = setTimeout(() => setCurrentStep(4), 22000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [order]);

  if (!order) return null;

  const steps = [
    { id: 1, title: 'Đã nhận đơn', desc: 'Quán đã xác nhận', icon: '🧾' },
    { id: 2, title: 'Đang chuẩn bị', desc: 'Đầu bếp đang nấu', icon: '🍳' },
    { id: 3, title: 'Đang giao hàng', desc: 'Shipper đang trên đường', icon: '🛵' },
    { id: 4, title: 'Đã hoàn tất', desc: 'Chúc bạn ngon miệng!', icon: '😋' }
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="status-modal-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="status-header">
          <div className="status-badge-title">
            <span className="live-indicator"></span>
            <h3>Theo Dõi Đơn Hàng #{order.orderId}</h3>
          </div>
          <button className="status-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Stepper Timeline */}
        <div className="stepper-timeline">
          <div className="steps-row">
            {steps.map((s, idx) => {
              const isDone = currentStep > s.id;
              const isCurrent = currentStep === s.id;
              return (
                <div
                  key={s.id}
                  className={`step-item ${isDone ? 'done' : ''} ${isCurrent ? 'active' : ''}`}
                >
                  <div className="step-icon-bubble">
                    {isDone ? '✓' : s.icon}
                  </div>
                  <strong className="step-title">{s.title}</strong>
                  <span className="step-desc">{s.desc}</span>
                  {idx < steps.length - 1 && <div className="step-line-bar"></div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Driver & Delivery Simulation */}
        <div className="status-body-content">
          {currentStep >= 3 && (
            <div className="driver-card">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
                alt="Shipper"
                className="driver-avatar"
              />
              <div className="driver-info">
                <h4>Tài xế: Nguyễn Văn Hùng</h4>
                <p>⭐ 4.9 • Honda AirBlade 29-X1 888.99</p>
                <span className="driver-status">🛵 Đang cách bạn khoảng 1.2 km (~6 phút)</span>
              </div>
              <button className="btn-call-driver" onClick={() => alert('Đang kết nối cuộc gọi tới Shipper: 0912.345.678')}>
                📞 Gọi
              </button>
            </div>
          )}

          {/* Delivery & Customer Info */}
          <div className="order-info-section">
            <h4 className="info-title">📍 Địa chỉ nhận món</h4>
            <p><strong>{order.customerInfo.fullName}</strong> • {order.customerInfo.phoneNumber}</p>
            <p className="address-text">{order.customerInfo.address}</p>
            {order.customerInfo.deliveryNote && (
              <p className="note-text">📝 {order.customerInfo.deliveryNote}</p>
            )}
          </div>

          {/* Items Breakdown */}
          <div className="order-items-section">
            <h4 className="info-title">🍽️ Danh sách món ăn ({order.items.length} món)</h4>
            <div className="order-items-scroll">
              {order.items.map((item, i) => (
                <div key={i} className="ordered-item-row">
                  <div className="ordered-item-name">
                    <span className="qty-tag">{item.quantity}x</span>
                    <div>
                      <strong>{item.name}</strong>
                      {item.size && <span className="sub-tag">({item.size.name})</span>}
                      {item.toppings?.length > 0 && (
                        <p className="topping-note">
                          + {item.toppings.map(t => t.name).join(', ')}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="ordered-item-price">
                    {formatCurrency(item.unitPrice * item.quantity)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Summary */}
          <div className="order-payment-card">
            <div className="pay-row">
              <span>Phương thức:</span>
              <strong>
                {order.paymentMethod === 'cod'
                  ? '💵 Tiền mặt khi nhận hàng'
                  : order.paymentMethod === 'qr'
                  ? '📱 Chuyển khoản QR'
                  : '💳 Thẻ ngân hàng'}
              </strong>
            </div>
            <div className="pay-row">
              <span>Thời gian đặt:</span>
              <span>{formatDateTime(order.createdAt)}</span>
            </div>
            <div className="pay-row grand-total">
              <span>Tổng thanh toán:</span>
              <span className="total-highlight">{formatCurrency(order.totalAmount)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="status-footer">
          <button className="btn-close-status" onClick={onClose}>
            Đóng & Tiếp tục xem món khác
          </button>
        </div>
      </div>
    </div>
  );
};
