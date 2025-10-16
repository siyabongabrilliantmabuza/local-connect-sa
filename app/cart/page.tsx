'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store/useStore';
import { Trash2, ShoppingCart } from 'lucide-react';

export default function CartPage() {
  const { cartItems, removeFromCart, updateCartQuantity, getCartTotal } = useStore();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 py-12">
        <div className="container mx-auto px-4 text-center">
          <ShoppingCart className="h-16 w-16 mx-auto mb-4 text-slate-400" />
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Your Cart is Empty
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Start shopping to add items to your cart
          </p>
          <Link href="/products">
            <Button className="bg-fuchsia-600 hover:bg-fuchsia-700">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.product_id}
                  className="bg-white dark:bg-slate-800 rounded-lg p-4 flex gap-4"
                >
                  {/* Product Image */}
                  <div className="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={item.product?.image_url || ''}
                      alt={item.product?.name || ''}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-grow">
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      {item.product?.name}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {item.product?.category}
                    </p>
                    <p className="text-fuchsia-600 dark:text-fuchsia-400 font-bold mt-2">
                      R{item.product?.price}
                    </p>
                  </div>

                  {/* Quantity and Remove */}
                  <div className="flex flex-col items-end justify-between">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFromCart(item.product_id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>

                    <div className="flex items-center border border-slate-300 dark:border-slate-600 rounded-lg">
                      <button
                        onClick={() =>
                          updateCartQuantity(
                            item.product_id,
                            Math.max(1, item.quantity - 1)
                          )
                        }
                        className="px-2 py-1 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        −
                      </button>
                      <span className="px-3 py-1 text-slate-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateCartQuantity(item.product_id, item.quantity + 1)
                        }
                        className="px-2 py-1 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 h-fit">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Subtotal</span>
                <span>R{getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="border-t border-slate-200 dark:border-slate-700 pt-3 flex justify-between font-bold text-slate-900 dark:text-white">
                <span>Total</span>
                <span>R{getCartTotal().toFixed(2)}</span>
              </div>
            </div>

            <Button className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 mb-3">
              Proceed to Checkout
            </Button>
            <Link href="/products">
              <Button variant="outline" className="w-full">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
