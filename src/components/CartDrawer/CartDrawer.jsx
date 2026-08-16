import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { formatCurrency } from '../../utils/formatters';
import { VOUCHERS } from '../../data/vouchers';
import './CartDrawer.css';

export const CartDrawer = ({ isOpen, onClose, onOpenCheckout }) => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    clearCart,
    subtotal,
    baseDeliveryFee,
    finalDeliveryFee,
    discountAmount,
    grandTotal,
    appliedVoucher,
    applyVoucher,
    removeVoucher
  } = useCart();

  const [voucherInput, setVoucherInput] = useState('');

  if (!isOpen) return null;

  const handleApplyVoucher = (e) => {
    e.preventDefault();
    if (!voucherInput.trim()) return;
    const res = applyVoucher(voucherInput);
    if (res.success) {
      setVoucherInput('');
    }
  };

  return (
    <div className="drawer-backdrop" onClick={onClose}>
      <div className="cart-drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="header-title-wrap">
            <span className="cart-title-icon">🛒</span>
            <h3>Giỏ Hàng Của Bạn</h3>
            <span className="items-badge">({cart.reduce((t, i) => t + i.quantity, 0)})</span>
          </div>

          <div className="drawer-header-actions">
            {cart.length > 0 && (
              <button className="btn-clear-all" onClick={clearCart} title="Xóa toàn bộ">
                Xóa tất cả
              </button>
            )}
            <button className="drawer-close-btn" onClick={onClose}>
              ✕
            </button>
          </div>
        </div>

        {/* Drawer Body: Items or Empty */}
        <div className="drawer-body">
          {cart.length === 0 ? (
            <div className="empty-cart-state">
              <div className="empty-cart-icon">🛍️</div>
              <h4>Giỏ hàng của bạn đang trống</h4>
              <p>Hãy thêm các món ăn ngon từ thực đơn để thưởng thức nhé!</p>
              <button className="btn-continue-shopping" onClick={onClose}>
                Tiếp tục chọn món
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {cart.map((item) => (
                <div key={item.cartItemId} className="cart-item-row">
                  <img src={item.image} alt={item.name} className="cart-item-img" />

                  <div className="cart-item-details">
                    <div className="item-title-line">
                      <h4 className="item-name">{item.name}</h4>
                      <button
                        className="item-remove-btn"
                        onClick={() => removeFromCart(item.cartItemId)}
                        title="Xóa món"
                      >
                        ✕
                      </button>
                    </div>

                    {/* Size & Toppings Tag */}
                    <div className="item-meta-tags">
                      {item.size && <span className="meta-pill">{item.size.name}</span>}
                      {item.toppings && item.toppings.map((t) => (
                        <span key={t.id} className="meta-pill topping-pill">
                          +{t.name}
                        </span>
                      ))}
                    </div>

                    {item.note && (
                      <p className="item-note-text">📝 {item.note}</p>
                    )}

                    <div className="item-footer-line">
                      <span className="item-price">
                        {formatCurrency(item.unitPrice * item.quantity)}
                      </span>

                      {/* Quantity Controller */}
                      <div className="cart-qty-ctrl">
                        <button
                          className="cart-qty-btn"
                          onClick={() => updateQuantity(item.cartItemId, -1)}
                        >
                          −
                        </button>
                        <span className="cart-qty-num">{item.quantity}</span>
                        <button
                          className="cart-qty-btn"
                          onClick={() => updateQuantity(item.cartItemId, 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer: Vouchers & Checkout */}
        {cart.length > 0 && (
          <div className="drawer-footer">
            {/* Voucher Section */}
            <div className="drawer-voucher-section">
              {appliedVoucher ? (
                <div className="applied-voucher-card">
                  <div className="voucher-info">
                    <span className="voucher-icon">🏷️</span>
                    <div>
                      <strong>{appliedVoucher.code}</strong>
                      <p>{appliedVoucher.description}</p>
                    </div>
                  </div>
                  <button className="btn-remove-voucher" onClick={removeVoucher}>
                    Hủy
                  </button>
                </div>
              ) : (
                <form className="voucher-input-form" onSubmit={handleApplyVoucher}>
                  <input
                    type="text"
                    placeholder="Nhập mã giảm giá (ví dụ: BANMOI, YUM20)"
                    value={voucherInput}
                    onChange={(e) => setVoucherInput(e.target.value)}
                  />
                  <button type="submit" className="btn-apply-voucher">
                    Áp dụng
                  </button>
                </form>
              )}

              {/* Quick voucher hints */}
              {!appliedVoucher && (
                <div className="quick-voucher-hints">
                  {VOUCHERS.slice(0, 3).map((v) => (
                    <button
                      key={v.code}
                      type="button"
                      className="mini-voucher-chip"
                      onClick={() => applyVoucher(v.code)}
                    >
                      {v.code}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Bill Breakdown */}
            <div className="bill-breakdown">
              <div className="bill-row">
                <span>Tạm tính ({cart.reduce((t, i) => t + i.quantity, 0)} món):</span>
                <span className="bill-val">{formatCurrency(subtotal)}</span>
              </div>

              <div className="bill-row">
                <span>Phí giao hàng:</span>
                <span className="bill-val">
                  {baseDeliveryFee === 0 ? (
                    <span className="free-ship-tag">Miễn phí</span>
                  ) : finalDeliveryFee < baseDeliveryFee ? (
                    <>
                      <span className="strike-fee">{formatCurrency(baseDeliveryFee)}</span>{' '}
                      <span className="free-ship-tag">{formatCurrency(finalDeliveryFee)}</span>
                    </>
                  ) : (
                    formatCurrency(baseDeliveryFee)
                  )}
                </span>
              </div>

              {discountAmount > 0 && (
                <div className="bill-row discount-row">
                  <span>Giảm giá ({appliedVoucher?.code}):</span>
                  <span className="bill-val">-{formatCurrency(discountAmount)}</span>
                </div>
              )}

              <div className="bill-divider"></div>

              <div className="bill-row total-row">
                <span className="total-label">Tổng thanh toán:</span>
                <span className="grand-total-val">{formatCurrency(grandTotal)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button className="btn-go-checkout" onClick={onOpenCheckout}>
              <span>Tiến hành đặt hàng</span>
              <span className="checkout-total-pill">{formatCurrency(grandTotal)}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
