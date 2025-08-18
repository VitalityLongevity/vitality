import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useLocation } from 'react-router-dom';

export default function FloatingCartButton() {
  const { state, dispatch } = useCart();
  const location = useLocation();
  
  // Don't show on admin pages
  const isAdminPage = location.pathname.startsWith('/admin');
  
  // Don't show if no items in cart
  const itemCount = state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
  
  if (isAdminPage || itemCount === 0) {
    return null;
  }

  return (
    <button
      onClick={() => dispatch({ type: 'TOGGLE_CART' })}
      className="fixed bottom-6 right-6 z-40 md:hidden bg-amber-600 hover:bg-amber-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
      aria-label="Open shopping cart"
    >
      <ShoppingCart className="h-6 w-6" />
      {itemCount > 0 && (
        <span className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center animate-pulse">
          {itemCount > 99 ? '99+' : itemCount}
        </span>
      )}
    </button>
  );
}
