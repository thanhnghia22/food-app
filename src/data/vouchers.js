export const VOUCHERS = [
  {
    code: 'FREESHIP',
    title: 'Miễn phí giao hàng',
    description: 'Giảm 15.000 ₫ phí giao hàng cho đơn từ 100.000 ₫',
    discountType: 'fixed', // 'fixed' | 'percent'
    discountValue: 15000,
    minOrder: 100000
  },
  {
    code: 'YUM20',
    title: 'Giảm 20% tổng đơn',
    description: 'Giảm 20% tối đa 40.000 ₫ cho đơn từ 120.000 ₫',
    discountType: 'percent',
    discountValue: 20,
    maxDiscount: 40000,
    minOrder: 120000
  },
  {
    code: 'BANMOI',
    title: 'Khách hàng mới',
    description: 'Giảm ngay 25.000 ₫ cho mọi đơn hàng từ 80.000 ₫',
    discountType: 'fixed',
    discountValue: 25000,
    minOrder: 80000
  },
  {
    code: 'YUM50K',
    title: 'Đại tiệc 50K',
    description: 'Giảm 50.000 ₫ cho đơn hàng từ 250.000 ₫',
    discountType: 'fixed',
    discountValue: 50000,
    minOrder: 250000
  }
];
