import { create } from 'zustand';
import { supabase } from '../lib/supabase';
import type { CartItem, Product } from '../types';
import { useAuthStore } from './authStore';

interface CartState {
  items: CartItem[];
  loading: boolean;
  addToCart: (product: Product, size: string, quantity: number) => Promise<void>;
  removeFromCart: (cartItemId: string) => Promise<void>;
  updateQuantity: (cartItemId: string, quantity: number) => Promise<void>;
  fetchCart: () => Promise<void>;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  loading: false,

  addToCart: async (product, size, quantity) => {
    try {
      const { user } = useAuthStore.getState();
      if (!user) {
        console.error("User not authenticated");
        return;
      }

      // Check if the item already exists in the cart
      const { data: existingItems, error } = await supabase
        .from('cart_items')
        .select('*')
        .eq('product_id', product.id)
        .eq('size', size)
        .eq('user_id', user.id);  // Filter by user_id

      if (error) {
        console.error('Error checking existing item:', error.message);
        return;
      }

      if (existingItems && existingItems.length > 0) {
        // Update the existing item's quantity
        const existingItem = existingItems[0];
        await supabase
          .from('cart_items')
          .update({ quantity: existingItem.quantity + quantity })
          .eq('id', existingItem.id);
      } else {
        // Insert a new item into the cart with user_id
        await supabase
          .from('cart_items')
          .insert({ product_id: product.id, size, quantity, user_id: user.id });  // Add user_id
      }

      // Refresh the cart
      await get().fetchCart();
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  },

  removeFromCart: async (cartItemId) => {
    try {
      const { user } = useAuthStore.getState();
      if (!user) {
        console.error("User not authenticated");
        return;
      }

      await supabase
        .from('cart_items')
        .delete()
        .eq('id', cartItemId)
        .eq('user_id', user.id);  // Ensure the item belongs to the user

      set((state) => ({
        items: state.items.filter((item) => item.id !== cartItemId),
      }));
    } catch (err) {
      console.error('Error removing from cart:', err);
    }
  },

  updateQuantity: async (cartItemId, quantity) => {
    try {
      const { user } = useAuthStore.getState();
      if (!user) {
        console.error("User not authenticated");
        return;
      }

      await supabase
        .from('cart_items')
        .update({ quantity })
        .eq('id', cartItemId)
        .eq('user_id', user.id);  // Ensure the item belongs to the user

      set((state) => ({
        items: state.items.map((item) =>
          item.id === cartItemId ? { ...item, quantity } : item
        ),
      }));
    } catch (err) {
      console.error('Error updating quantity:', err);
    }
  },

  fetchCart: async () => {
    try {
      const { user } = useAuthStore.getState();
      if (!user) {
        console.error("User not authenticated");
        set({ items: [], loading: false });
        return;
      }

      set({ loading: true });
      const { data, error } = await supabase
        .from('cart_items')
        .select(`
          *,
          product:products(*)
        `)
        .eq('user_id', user.id);  // Filter by user_id

      if (error) {
        console.error('Error fetching cart:', error.message);
        set({ items: [], loading: false });
      } else {
        set({ items: data || [], loading: false });
      }
    } catch (err) {
      console.error('Error fetching cart:', err);
      set({ loading: false });
    }
  },
}));
