import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartItem {
  cartKey: string;
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  selectedSize: string;
  selectedColor: string;
}

interface CartStore {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (cartKey: string) => void;
  increaseQuantity: (cartKey: string) => void;
  decreaseQuantity: (cartKey: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],

      addToCart: (item) => {
        const existing = get().cartItems.find(
          (cartItem) => cartItem.cartKey === item.cartKey,
        );

        if (existing) {
          set({
            cartItems: get().cartItems.map((cartItem) =>
              cartItem.cartKey === item.cartKey
                ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                : cartItem,
            ),
          });
        } else {
          set({
            cartItems: [...get().cartItems, item],
          });
        }
      },

      removeFromCart: (cartKey) => {
        set({
          cartItems: get().cartItems.filter((item) => item.cartKey !== cartKey),
        });
      },

      increaseQuantity: (cartKey) => {
        set({
          cartItems: get().cartItems.map((item) =>
            item.cartKey === cartKey
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          ),
        });
      },

      decreaseQuantity: (cartKey) => {
        const targetItem = get().cartItems.find(
          (item) => item.cartKey === cartKey,
        );

        if (!targetItem) return;

        if (targetItem.quantity <= 1) {
          set({
            cartItems: get().cartItems.filter(
              (item) => item.cartKey !== cartKey,
            ),
          });
        } else {
          set({
            cartItems: get().cartItems.map((item) =>
              item.cartKey === cartKey
                ? { ...item, quantity: item.quantity - 1 }
                : item,
            ),
          });
        }
      },

      clearCart: () => {
        set({ cartItems: [] });
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({
        cartItems: state.cartItems,
      }),
      skipHydration: true,
    },
  ),
);
