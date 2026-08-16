/**
 * Định dạng số tiền thành chuỗi VNĐ (ví dụ: 50.000 ₫)
 */
export const formatCurrency = (amount) => {
  if (isNaN(amount) || amount === null) return '0 ₫';
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Định dạng thời gian (ví dụ: 14:30 - 17/08/2026)
 */
export const formatDateTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

/**
 * Tạo mã đơn hàng ngẫu nhiên (ví dụ: #YUM-8921)
 */
export const generateOrderId = () => {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `YUM-${randomNum}`;
};
