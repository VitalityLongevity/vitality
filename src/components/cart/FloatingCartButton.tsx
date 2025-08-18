import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

export default function FloatingCartButton() {
  const { state, dispatch } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Don't show on admin pages
  const isAdminPage = location.pathname.startsWith('/admin');
  
  const itemCount = state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
  
  // Hide only on admin pages
  if (isAdminPage) {
    return null;
  }

  const handleClick = () => {
    if (itemCount > 0) {
      // If cart has items, open cart drawer
      dispatch({ type: 'TOGGLE_CART' });
    } else {
      // If cart is empty, navigate to shop
      navigate('/collections');
    }
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 md:hidden bg-amber-600 hover:bg-amber-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95"
      aria-label={itemCount > 0 ? `Shopping cart with ${itemCount} items` : 'Go to shop'}
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
