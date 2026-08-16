import React, { createContext, useContext, useState, useEffect } from 'react';
import { VOUCHERS } from '../data/vouchers';
import { generateOrderId } from '../utils/formatters';

const CartContext = createContext();

const LOCAL_STORAGE_CART_KEY = 'yumfood_cart_v1';
const LOCAL_STORAGE_FAVORITES_KEY = 'yumfood_favs_v1';
const LOCAL_STORAGE_ORDERS_KEY = 'yumfood_orders_v1';

export const CartProvider = ({ children }) => {
  // Load saved state from localStorage
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_FAVORITES_KEY);
      return saved ? JSON.parse(saved) : [1, 2, 5]; // Default favorites
    } catch {
      return [1, 2, 5];
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_ORDERS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [activeOrder, setActiveOrder] = useState(null);
  const [toast, setToast] = useState(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_ORDERS_KEY, JSON.stringify(orders));
  }, [orders]);

  // Toast Notification helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Toggle Favorite
  const toggleFavorite = (foodId) => {
    setFavorites(prev => {
      const exists = prev.includes(foodId);
      if (exists) {
        showToast('Đã xóa món khỏi danh sách yêu thích', 'info');
        return prev.filter(id => id !== foodId);
      } else {
        showToast('Đã thêm vào danh sách yêu thích ❤️', 'success');
        return [...prev, foodId];
      }
    });
  };

  const isFavorite = (foodId) => favorites.includes(foodId);

  // Calculate Single Item Price with options
  const calculateItemPrice = (food, selectedSize, selectedToppings) => {
    const sizeExtra = selectedSize ? selectedSize.priceModifier : 0;
    const toppingsExtra = selectedToppings.reduce((sum, t) => sum + t.price, 0);
    return food.price + sizeExtra + toppingsExtra;
  };

  // Add Item to Cart
  const addToCart = (food, options = {}) => {
    const size = options.size || (food.sizes && food.sizes[0]) || { name: 'Tiêu chuẩn', priceModifier: 0 };
    const toppings = options.toppings || [];
    const note = options.note || '';
    const quantity = options.quantity || 1;

    const unitPrice = calculateItemPrice(food, size, toppings);

    // Create unique key based on item configurations
    const toppingIds = toppings.map(t => t.id).sort().join('-');
    const cartItemId = `${food.id}_${size.name}_${toppingIds}_${note}`;

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newItem = {
          cartItemId,
          foodId: food.id,
          name: food.name,
          image: food.image,
          category: food.category,
          unitPrice,
          size,
          toppings,
          note,
          quantity
        };
        return [...prev, newItem];
      }
    });

    showToast(`Đã thêm "${food.name}" vào giỏ hàng! 🛒`);
  };

  // Update item quantity
  const updateQuantity = (cartItemId, delta) => {
    setCart(prev => {
      return prev
        .map(item => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean);
    });
  };

  // Remove single item
  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
    showToast('Đã xóa món khỏi giỏ hàng', 'info');
  };

  // Clear entire cart
  const clearCart = () => {
    setCart([]);
    setAppliedVoucher(null);
  };

  // Totals calculations
  const totalItemsCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => total + item.unitPrice * item.quantity, 0);

  // Delivery Fee policy: 18.000 ₫ standard, Free if subtotal > 300k
  const baseDeliveryFee = subtotal === 0 ? 0 : subtotal >= 300000 ? 0 : 18000;

  // Calculate Voucher Discount
  let discountAmount = 0;
  if (appliedVoucher && subtotal >= appliedVoucher.minOrder) {
    if (appliedVoucher.discountType === 'fixed') {
      discountAmount = appliedVoucher.discountValue;
    } else if (appliedVoucher.discountType === 'percent') {
      const percentValue = (subtotal * appliedVoucher.discountValue) / 100;
      discountAmount = appliedVoucher.maxDiscount
        ? Math.min(percentValue, appliedVoucher.maxDiscount)
        : percentValue;
    }
  }

  // Delivery discount check
  let finalDeliveryFee = baseDeliveryFee;
  if (appliedVoucher && appliedVoucher.code === 'FREESHIP' && subtotal >= appliedVoucher.minOrder) {
    finalDeliveryFee = Math.max(0, baseDeliveryFee - 15000);
    discountAmount = 0; // The voucher covers shipping directly
  }

  const grandTotal = Math.max(0, subtotal + finalDeliveryFee - discountAmount);

  // Voucher handler
  const applyVoucher = (code) => {
    const cleanCode = code.trim().toUpperCase();
    const found = VOUCHERS.find(v => v.code === cleanCode);

    if (!found) {
      showToast('Mã giảm giá không tồn tại hoặc đã hết hạn!', 'error');
      return { success: false, message: 'Mã không hợp lệ' };
    }

    if (subtotal < found.minOrder) {
      showToast(`Đơn hàng cần tối thiểu ${new Intl.NumberFormat('vi-VN').format(found.minOrder)} ₫ để áp dụng mã này!`, 'error');
      return { success: false, message: `Chưa đạt mức tối thiểu` };
    }

    setAppliedVoucher(found);
    showToast(`Áp dụng mã ${found.code} thành công! 🎉`);
    return { success: true, voucher: found };
  };

  const removeVoucher = () => {
    setAppliedVoucher(null);
    showToast('Đã hủy mã giảm giá', 'info');
  };

  // Create Order
  const createOrder = (customerInfo, paymentMethod) => {
    const newOrder = {
      orderId: generateOrderId(),
      createdAt: new Date().toISOString(),
      items: [...cart],
      customerInfo,
      paymentMethod,
      subtotal,
      deliveryFee: finalDeliveryFee,
      discount: discountAmount,
      totalAmount: grandTotal,
      voucherCode: appliedVoucher ? appliedVoucher.code : null,
      status: 'received', // 'received' | 'preparing' | 'delivering' | 'completed'
      estimatedTime: '20-30 phút'
    };

    setOrders(prev => [newOrder, ...prev]);
    setActiveOrder(newOrder);
    clearCart();
    return newOrder;
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        totalItemsCount,
        subtotal,
        baseDeliveryFee,
        finalDeliveryFee,
        discountAmount,
        grandTotal,
        appliedVoucher,
        applyVoucher,
        removeVoucher,
        favorites,
        toggleFavorite,
        isFavorite,
        orders,
        createOrder,
        activeOrder,
        setActiveOrder,
        toast,
        showToast
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
