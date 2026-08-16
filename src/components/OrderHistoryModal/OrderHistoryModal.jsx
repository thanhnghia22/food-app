import React from 'react';
import { useCart } from '../../context/CartContext';
import { formatCurrency, formatDateTime } from '../../utils/formatters';
import './OrderHistoryModal.css';

export const OrderHistoryModal = ({ isOpen, onClose, onTrackOrder }) => {
  const { orders } = useCart();

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="history-modal-panel" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="history-header">
          <div className="history-title-wrap">
            <span className="history-icon">📜</span>
            <h3>Lịch Sử Đơn Hàng Của Bạn</h3>
          </div>
          <button className="history-close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Orders List */}
        <div className="history-body">
          {orders.length === 0 ? (
            <div className="empty-history-state">
              <div className="empty-history-icon">📦</div>
              <h4>Bạn chưa có đơn hàng nào</h4>
              <p>Các đơn hàng bạn đặt sẽ được lưu trữ tại đây để bạn tiện theo dõi và đặt lại.</p>
            </div>
          ) : (
            <div className="history-cards-list">
              {orders.map((ord) => (
                <div key={ord.orderId} className="history-card">
                  <div className="history-card-header">
                    <div>
                      <strong className="order-id-badge">#{ord.orderId}</strong>
                      <span className="order-date">{formatDateTime(ord.createdAt)}</span>
                    </div>
                    <span className="order-status-pill">
                      {ord.status === 'completed' ? '✅ Đã hoàn tất' : '🛵 Đang xử lý'}
                    </span>
                  </div>

                  <div className="history-items-preview">
                    {ord.items.map((item, idx) => (
                      <span key={idx} className="item-chip">
                        {item.quantity}x {item.name}
                      </span>
                    ))}
                  </div>

                  <div className="history-card-footer">
                    <div className="order-amount-wrap">
                      <span className="amount-label">Tổng tiền:</span>
                      <strong className="amount-val">{formatCurrency(ord.totalAmount)}</strong>
                    </div>

                    <button
                      className="btn-track-order"
                      onClick={() => {
                        onTrackOrder(ord);
                        onClose();
                      }}
                    >
                      Xem chi tiết & Theo dõi
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
