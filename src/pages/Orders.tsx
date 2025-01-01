import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { Order } from '../types';

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      const { data } = await supabase
        .from('orders')
        .select(`
          *,
          items:order_items(
            *,
            product:products(*)
          )
        `)
        .order('created_at', { ascending: false });
      setOrders(data || []);
      setLoading(false);
    }

    fetchOrders();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-xl">No orders found</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Your Orders</h1>
      
      <div className="space-y-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm text-gray-600">Order ID: {order.id}</p>
                  <p className="text-sm text-gray-600">
                    Date: {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <span className="inline-block px-3 py-1 rounded-full text-sm capitalize bg-blue-100 text-blue-800">
                    {order.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-4">
              {order.items?.map((item) => (
                <div key={item.id} className="flex items-center gap-4 py-2">
                  <img
                    src={item.product?.image_url}
                    alt={item.product?.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <p className="font-semibold">{item.product?.name}</p>
                    <p className="text-sm text-gray-600">
                      Size: {item.size} | Quantity: {item.quantity}
                    </p>
                    <p className="text-sm font-semibold">
                      ${item.price_at_time}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-gray-50">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>${order.total_amount}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}