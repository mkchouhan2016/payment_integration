'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Plant } from '../services/plantService';

interface CartItem {
  plant: Plant;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (plant: Plant) => void;
  removeFromCart: (plantId: number) => void;
  updateQuantity: (plantId: number, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  totalItems: 0,
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
        calculateTotalItems(parsedCart);
      } catch (error) {
        console.error('Error parsing cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
    calculateTotalItems(items);
  }, [items]);

  const calculateTotalItems = (cartItems: CartItem[]) => {
    const total = cartItems.reduce((sum, item) => sum + item.quantity, 0);
    setTotalItems(total);
  };

  const addToCart = (plant: Plant) => {
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.plant.id === plant.id);
      
      if (existingItem) {
        // If item already exists, increase quantity
        return prevItems.map(item => 
          item.plant.id === plant.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      } else {
        // If item doesn't exist, add new item
        return [...prevItems, { plant, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (plantId: number) => {
    setItems(prevItems => prevItems.filter(item => item.plant.id !== plantId));
  };

  const updateQuantity = (plantId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(plantId);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.plant.id === plantId 
          ? { ...item, quantity } 
          : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      updateQuantity, 
      clearCart,
      totalItems
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext); 