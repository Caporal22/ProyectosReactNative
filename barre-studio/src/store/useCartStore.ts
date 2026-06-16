import { create } from 'zustand';
import { CartItem, Product } from '../types/product';

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, qty: number) => void;
  clear: () => void;
  total: () => number;
  count: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addItem: (product) => {
    const existing = get().items.find((i) => i.product.id === product.id);
    if (existing) {
      set({
        items: get().items.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i,
        ),
      });
    } else {
      set({ items: [...get().items, { product, quantity: 1 }] });
    }
  },

  removeItem: (productId) => set({ items: get().items.filter((i) => i.product.id !== productId) }),

  updateQty: (productId, qty) => {
    if (qty <= 0) {
      get().removeItem(productId);
      return;
    }
    set({
      items: get().items.map((i) => (i.product.id === productId ? { ...i, quantity: qty } : i)),
    });
  },

  clear: () => set({ items: [] }),

  total: () => get().items.reduce((sum, i) => sum + i.product.price * i.quantity, 0),
  count: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
}));
