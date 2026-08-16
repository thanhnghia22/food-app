import React, { useState, useMemo } from 'react';
import { CartProvider, useCart } from './context/CartContext';
import { FOOD_ITEMS } from './data/foods';
import { Navbar } from './components/Navbar/Navbar';
import { HeroBanner } from './components/HeroBanner/HeroBanner';
import { CategoryFilter } from './components/CategoryFilter/CategoryFilter';
import { FoodList } from './components/FoodList/FoodList';
import { FoodDetailModal } from './components/FoodDetailModal/FoodDetailModal';
import { CartDrawer } from './components/CartDrawer/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal/CheckoutModal';
import { OrderStatusModal } from './components/OrderStatusModal/OrderStatusModal';
import { OrderHistoryModal } from './components/OrderHistoryModal/OrderHistoryModal';
import { FavoritesModal } from './components/FavoritesModal/FavoritesModal';
import { Footer } from './components/Footer/Footer';
import './App.css';

const FoodAppContent = () => {
  const { toast, activeOrder, setActiveOrder } = useCart();

  // State Management
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [sortBy, setSortBy] = useState('default');
  const [filterTag, setFilterTag] = useState('all');

  // Modals & Drawers States
  const [selectedFood, setSelectedFood] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [trackedOrder, setTrackedOrder] = useState(null);

  // Filter & Sort Logic
  const filteredFoods = useMemo(() => {
    let list = [...FOOD_ITEMS];

    // Filter by category
    if (activeCategory !== 'all') {
      list = list.filter((item) => item.category === activeCategory);
    }

    // Filter by tags
    if (filterTag === 'best-seller') {
      list = list.filter((item) => item.isPopular);
    } else if (filterTag === 'discount') {
      list = list.filter((item) => item.oldPrice && item.oldPrice > item.price);
    } else if (filterTag === 'new') {
      list = list.filter((item) => item.isNew);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.tags?.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name, 'vi'));
    }

    return list;
  }, [activeCategory, filterTag, searchQuery, sortBy]);

  const handleResetFilters = () => {
    setActiveCategory('all');
    setFilterTag('all');
    setSearchQuery('');
    setSortBy('default');
  };

  const handleScrollToMenu = () => {
    const el = document.getElementById('menu-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-layout">
      {/* Toast Notification */}
      {toast && (
        <div className={`toast-notification toast-${toast.type}`}>
          <span className="toast-icon">
            {toast.type === 'success' ? '✅' : toast.type === 'error' ? '⚠️' : 'ℹ️'}
          </span>
          <span className="toast-text">{toast.message}</span>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOrders={() => setIsOrdersOpen(true)}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
      />

      {/* Main Page Content */}
      <main className="main-content">
        <HeroBanner
          onExploreMenu={handleScrollToMenu}
          onSelectFood={(food) => setSelectedFood(food)}
        />

        <CategoryFilter
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          sortBy={sortBy}
          onSelectSort={setSortBy}
          filterTag={filterTag}
          onSelectTag={setFilterTag}
        />

        <FoodList
          foods={filteredFoods}
          searchQuery={searchQuery}
          onSelectFood={(food) => setSelectedFood(food)}
          onResetFilters={handleResetFilters}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Modals & Drawers */}
      {selectedFood && (
        <FoodDetailModal
          food={selectedFood}
          onClose={() => setSelectedFood(null)}
        />
      )}

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onOpenCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderSuccess={(order) => {
          setTrackedOrder(order);
        }}
      />

      {(trackedOrder || activeOrder) && (
        <OrderStatusModal
          order={trackedOrder || activeOrder}
          onClose={() => {
            setTrackedOrder(null);
            setActiveOrder(null);
          }}
        />
      )}

      <OrderHistoryModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        onTrackOrder={(order) => {
          setTrackedOrder(order);
        }}
      />

      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        onSelectFood={(food) => setSelectedFood(food)}
      />
    </div>
  );
};

export default function App() {
  return (
    <CartProvider>
      <FoodAppContent />
    </CartProvider>
  );
}
