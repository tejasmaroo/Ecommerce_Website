import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

export default function Home() {
  return (
    <div className="text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold mb-6">Welcome to Apparel Store</h1>
        <p className="text-xl text-gray-600 mb-8">
          Discover our collection of premium clothing and accessories
        </p>
        
        <div className="relative h-96 mb-12">
          <img
            src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?auto=format&fit=crop&q=80"
            alt="Fashion Banner"
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <Link
              to="/products"
              className="bg-white text-black px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center space-x-2"
            >
              <ShoppingBag className="h-5 w-5" />
              <span>Shop Now</span>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Premium Quality</h3>
            <p className="text-gray-600">Carefully selected materials for lasting comfort</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Fast Shipping</h3>
            <p className="text-gray-600">Quick delivery to your doorstep</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Easy Returns</h3>
            <p className="text-gray-600">30-day return policy for your peace of mind</p>
          </div>
        </div>
      </div>
    </div>
  );
}