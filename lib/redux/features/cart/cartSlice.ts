import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "@/types/cart";

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const item = action.payload;
      const existingItem = state.items.find(
        (i) => i.id === item.id && i.selectedSize === item.selectedSize && i.selectedColor === item.selectedColor
      );

      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.items.push(item);
      }
    },
    removeFromCart: (state, action: PayloadAction<{
      id: string;
      selectedSize?: string;
      selectedColor?: string;
    }>) => {
      const { id, selectedSize, selectedColor } = action.payload;
      state.items = state.items.filter(
        (item) => 
          !(item.id === id && 
          item.selectedSize === selectedSize && 
          item.selectedColor === selectedColor)
      );
    },
    updateQuantity: (
      state,
      action: PayloadAction<{
        id: string;
        quantity: number;
        selectedSize?: string;
        selectedColor?: string;
      }>
    ) => {
      const { id, quantity, selectedSize, selectedColor } = action.payload;
      const item = state.items.find(
        (item) => 
          item.id === id && 
          item.selectedSize === selectedSize && 
          item.selectedColor === selectedColor
      );
      if (item) {
        item.quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    },
    closeCart: (state) => {
      state.isOpen = false;
    },
    openCart: (state) => {
      state.isOpen = true;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  toggleCart,
  closeCart,
  openCart,
} = cartSlice.actions;

export default cartSlice.reducer;