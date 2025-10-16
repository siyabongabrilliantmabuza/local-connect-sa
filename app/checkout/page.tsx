'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useStore } from '@/lib/store/useStore';
import { ArrowLeft, CheckCircle } from 'lucide-react';

export default function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart, user } = useStore();
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.full_name?.split(' ')[0] || '',
    lastName: user?.full_name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setOrderPlaced(true);
      clearCart();
    }, 2000);
  };

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Your Cart is Empty
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Add items to your cart before checking out
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

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 py-12">
        <div className="container mx-auto px-4 text-center">
          <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Order Placed Successfully!
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-2">
            Thank you for your purchase
          </p>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            Order confirmation has been sent to {formData.email}
          </p>
          <div className="space-x-4">
            <Link href="/products">
              <Button className="bg-fuchsia-600 hover:bg-fuchsia-700">
                Continue Shopping
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline">Back to Home</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 py-12">
      <div className="container mx-auto px-4">
        <Link href="/cart" className="flex items-center text-fuchsia-600 hover:text-fuchsia-700 mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Cart
        </Link>

        <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-8">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Shipping Information */}
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  Shipping Information
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="dark:bg-slate-700 dark:text-white"
                  />
                  <Input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="dark:bg-slate-700 dark:text-white"
                  />
                </div>
                <Input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="dark:bg-slate-700 dark:text-white mt-4"
                />
                <Input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                  required
                  className="dark:bg-slate-700 dark:text-white mt-4"
                />
                <Input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  className="dark:bg-slate-700 dark:text-white mt-4"
                />
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    required
                    className="dark:bg-slate-700 dark:text-white"
                  />
                  <Input
                    type="text"
                    name="postalCode"
                    placeholder="Postal Code"
                    value={formData.postalCode}
                    onChange={handleInputChange}
                    required
                    className="dark:bg-slate-700 dark:text-white"
                  />
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                  Payment Information
                </h2>
                <Input
                  type="text"
                  name="cardNumber"
                  placeholder="Card Number"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  required
                  className="dark:bg-slate-700 dark:text-white"
                />
                <div className="grid grid-cols-2 gap-4 mt-4">
                  <Input
                    type="text"
                    name="expiryDate"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    required
                    className="dark:bg-slate-700 dark:text-white"
                  />
                  <Input
                    type="text"
                    name="cvv"
                    placeholder="CVV"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    required
                    className="dark:bg-slate-700 dark:text-white"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-fuchsia-600 hover:bg-fuchsia-700 py-6 text-lg"
              >
                {isProcessing ? 'Processing...' : 'Place Order'}
              </Button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 h-fit">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Order Summary
            </h2>

            <div className="space-y-3 mb-6">
              {cartItems.map((item) => (
                <div
                  key={item.product_id}
                  className="flex justify-between text-sm text-slate-600 dark:text-slate-400"
                >
                  <span>
                    {item.product?.name} x {item.quantity}
                  </span>
                  <span>R{((item.product?.price || 0) * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-200 dark:border-slate-700 pt-3 space-y-3">
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Subtotal</span>
                <span>R{getCartTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-slate-600 dark:text-slate-400">
                <span>Tax</span>
                <span>R{(getCartTotal() * 0.15).toFixed(2)}</span>
              </div>
              <div className="border-t border-slate-200 dark:border-slate-700 pt-3 flex justify-between font-bold text-slate-900 dark:text-white">
                <span>Total</span>
                <span>R{(getCartTotal() * 1.15).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
