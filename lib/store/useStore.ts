import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, CartItem, Product } from '@/types';

interface StoreState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  logout: () => void;
  updateUserRole: (role: 'customer' | 'seller' | 'admin') => void;

  // Cart
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateCartQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => (
      {
        // Auth
        user: null,
        isAuthenticated: false,
        setUser: (user) => set({ user, isAuthenticated: !!user }),
        logout: () => set({ user: null, isAuthenticated: false }),
        updateUserRole: (role) =>
          set((state) => (
            {
              user: state.user ? { ...state.user, role } : null,
            }
          )),

        // Cart
        cartItems: [],
        addToCart: (product, quantity) =>
          set((state) => {
            const existingItem = state.cartItems.find(
              (item) => item.product_id === product.id
            );
            if (existingItem) {
              return {
                cartItems: state.cartItems.map((item) =>
                  item.product_id === product.id
                    ? { ...item, quantity: item.quantity + quantity }
                    : item
                ),
              };
            }
            return {
              cartItems: [
                ...state.cartItems,
                {
                  id: Date.now(),
                  user_id: state.user?.id || 0,
                  product_id: product.id,
                  quantity,
                  product,
                },
              ],
            };
          }),
        removeFromCart: (productId) =>
          set((state) => (
            {
              cartItems: state.cartItems.filter(
                (item) => item.product_id !== productId
              ),
            }
          )),
        updateCartQuantity: (productId, quantity) =>
          set((state) => (
            {
              cartItems: state.cartItems.map((item) =>
                item.product_id === productId ? { ...item, quantity } : item
              ),
            }
          )),
        clearCart: () => set({ cartItems: [] }),
        getCartTotal: () => {
          const state = get();
          return state.cartItems.reduce(
            (total, item) =>
              total + (item.product?.price || 0) * item.quantity,
            0
          );
        },
      }
    ),
    {
      name: 'local-connect-sa-store',
    }
  )
);
