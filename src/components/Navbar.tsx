import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, User, ShoppingCart } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';

export default function Navbar() {
  const user = useAuthStore(state => state.user);
  const signOut = useAuthStore(state => state.signOut);
  const items = useCartStore(state => state.items);

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6" />
            <span className="font-bold text-xl">Apparel Store</span>
          </Link>

          <div className="flex items-center space-x-8">
            <Link to="/products" className="hover:text-gray-600">Products</Link>
            
            {user ? (
              <>
                <Link to="/orders" className="hover:text-gray-600">Orders</Link>
                <Link to="/cart" className="relative hover:text-gray-600">
                  <ShoppingCart className="h-6 w-6" />
                  {items.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {items.length}
                    </span>
                  )}
                </Link>
                <button
                  onClick={() => signOut()}
                  className="hover:text-gray-600"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link to="/auth" className="flex items-center space-x-1 hover:text-gray-600">
                <User className="h-5 w-5" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}