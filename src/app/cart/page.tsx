'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTheme } from '../context/ThemeContext';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { removeFromCart, updateQuantity, clearCart } from '../store/cartSlice';
import { RootState } from '../store/store';

export default function CartPage() {
  const { isDark } = useTheme();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state: RootState) => state.cart.items);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleQuantityChange = (plantId: number, quantity: number) => {
    if (quantity > 0) {
      dispatch(updateQuantity({ plantId, quantity }));
    }
  };

  const handleRemoveItem = (plantId: number) => {
    dispatch(removeFromCart(plantId));
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    // Simulate checkout process
    setTimeout(() => {
      dispatch(clearCart());
      setIsCheckingOut(false);
    }, 2000);
  };

  const subtotal = cartItems.reduce((total: number, item: any) => total + (item.plant.price || 0) * item.quantity, 0);
  const shipping = subtotal > 0 ? 10 : 0;
  const total = subtotal + shipping;

  if (cartItems.length === 0) {
    return (
      <div className={`min-h-[60vh] flex flex-col items-center justify-center ${isDark ? 'text-gray-300' : 'text-gray-600'
        }`}>
        <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
        <p className="mb-8">Add some beautiful plants to your cart!</p>
        <a
          href="/"
          className={`px-6 py-3 rounded-lg font-medium ${isDark
            ? 'bg-green-600 hover:bg-green-700 text-white'
            : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
        >
          Continue Shopping
        </a>
      </div>
    );
  }
  console.log("isDark", isDark)
  return (
    <div className="space-y-8">
      <h1 className={`text-3xl font-bold ${isDark ? 'text-white' : 'text-gray-800'
        }`}>
        Shopping Cart
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item: any) => (
            <div
              key={item.plant.id}
              className={`flex items-center space-x-4 p-4 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'
                } shadow-md`}
            >
              <div className="relative w-24 h-24 flex-shrink-0">
                <Image
                  src={item.plant.image_url || '/placeholder-plant.jpg'}
                  alt={item.plant.common_name || 'Plant image'}
                  fill
                  className="object-cover rounded-md"
                  sizes="96px"
                />
              </div>
              <div className="flex-1">
                <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                  {item.plant.common_name || 'Unknown Plant'}
                </h3>
                <p className={`text-sm italic ${isDark ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                  {item.plant.scientific_name}
                </p>
                <p className={`text-sm mt-1 ${isDark ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                  ${(item.plant.price || 0).toFixed(2)} each
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleQuantityChange(item.plant.id, item.quantity - 1)}
                  className={`p-1 rounded ${isDark ? 'text-white' : 'text-gray-800'
                    }`}
                >
                  -
                </button>
                <span className={`w-8 text-center ${isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                  {item.quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(item.plant.id, item.quantity + 1)}
                  className={`p-1 rounded ${isDark ? 'text-white' : 'text-gray-800'
                    }`}
                >
                  +
                </button>
              </div>
              <button
                onClick={() => handleRemoveItem(item.plant.id)}
                className={`p-2 rounded-full ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
                  }`}
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        <div className={`lg:col-span-1 p-6 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'
          } shadow-md h-fit`}>
          <h2 className={`text-xl font-semibold mb-4 ${isDark ? 'text-white' : 'text-gray-800'
            }`}>
            Order Summary
          </h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Subtotal</span>
              <span className={isDark ? 'text-white' : 'text-gray-800'}>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>Shipping</span>
              <span className={isDark ? 'text-white' : 'text-gray-800'}>${shipping.toFixed(2)}</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between">
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                  Total
                </span>
                <span className={`font-semibold ${isDark ? 'text-white' : 'text-gray-800'
                  }`}>
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={handleCheckout}
            disabled={isCheckingOut}
            className={`w-full mt-6 py-3 rounded-lg font-medium ${isDark
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-green-500 hover:bg-green-600 text-white'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isCheckingOut ? 'Processing...' : 'Checkout'}
          </button>
        </div>
      </div>
    </div>
  );
} 