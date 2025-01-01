import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { useCartStore } from '../store/cartStore';
import type { Product } from '../types';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const addToCart = useCartStore(state => state.addToCart);

  useEffect(() => {
    async function fetchProduct() {
      const { data } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .single();
      setProduct(data);
      if (data?.size[0]) {
        setSelectedSize(data.size[0]);
      }
    }

    if (id) {
      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-[500px] object-cover rounded-lg"
        />
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600">{product.description}</p>
          <p className="text-2xl font-bold">${product.price}</p>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Size
            </label>
            <select
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full border border-gray-300 rounded-md p-2"
            >
              {product.size.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <button
            onClick={() => addToCart(product, selectedSize, quantity)}
            className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}