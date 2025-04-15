import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Plant } from '../services/plantService';

interface CartItem {
  plant: Plant;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Plant>) => {
      const existingItem = state.items.find(item => item.plant.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ plant: action.payload, quantity: 1 });
      }
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter(item => item.plant.id !== action.payload);
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
    },
    updateQuantity: (state, action: PayloadAction<{ plantId: number; quantity: number }>) => {
      const item = state.items.find(item => item.plant.id === action.payload.plantId);
      if (item) {
        item.quantity = action.payload.quantity;
      }
      state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer; 