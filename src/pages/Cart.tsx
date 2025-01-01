import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

export default function Cart() {
  const { items, loading, fetchCart, removeFromCart, updateQuantity } = useCartStore();

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-xl mb-4">Your cart is empty</p>
        <Link
          to="/products"
          className="inline-block bg-black text-white px-6 py-2 rounded-md"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const total = items.reduce((sum, item) => 
    sum + (item.product.price * item.quantity), 0
  );

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4"
          >
            <img
              src={item.product.image_url}
              alt={item.product.name}
              className="w-24 h-24 object-cover rounded"
            />
            
            <div className="flex-1">
              <h3 className="font-semibold">{item.product.name}</h3>
              <p className="text-gray-600">Size: {item.size}</p>
              <p className="font-semibold">${item.product.price}</p>
            </div>

            <div className="flex items-center gap-4">
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                className="w-20 border border-gray-300 rounded-md p-1"
              />
              
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-600"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
        <div className="flex justify-between text-xl font-bold mb-4">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        
        <button className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}