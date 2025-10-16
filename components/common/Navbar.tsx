'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useStore } from '@/lib/store/useStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Menu, X, Moon, Sun, ShoppingCart, Heart, LogOut, Store } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, theme, toggleTheme, cartItems } = useStore();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold bg-gradient-to-r from-fuchsia-600 to-purple-600 bg-clip-text text-transparent">
              LocalConnectSA
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-sm font-medium hover:text-fuchsia-600 transition">
              Home
            </Link>
            <Link href="/products" className="text-sm font-medium hover:text-fuchsia-600 transition">
              Products
            </Link>
            <Link href="/sellers" className="text-sm font-medium hover:text-fuchsia-600 transition">
              Sellers
            </Link>
            <Link href="/contact" className="text-sm font-medium hover:text-fuchsia-600 transition">
              Contact
            </Link>
            {user?.role === 'seller' && (
              <Link href="/dashboard" className="text-sm font-medium hover:text-fuchsia-600 transition">
                Dashboard
              </Link>
            )}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Search - Desktop */}
            <div className="hidden lg:flex items-center">
              <Input
                type="text"
                placeholder="Search products..."
                className="w-64 rounded-full"
              />
            </div>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>

            {/* Wishlist */}
            <Button variant="ghost" size="icon" className="rounded-full">
              <Heart className="h-5 w-5" />
            </Button>

            {/* Cart */}
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="rounded-full relative">
                <ShoppingCart className="h-5 w-5" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartItems.length}
                  </span>
                )}
              </Button>
            </Link>

            {/* Auth */}
            {user ? (
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium hidden sm:inline">{user.full_name}</span>
                {user.role !== 'seller' && (
                  <Link href="/become-seller">
                    <Button size="sm" variant="outline" className="flex items-center gap-2">
                      <Store className="h-4 w-4" />
                      <span className="hidden sm:inline">Sell</span>
                    </Button>
                  </Link>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={logout}
                  className="rounded-full"
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link href="/auth/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm" className="bg-fuchsia-600 hover:bg-fuchsia-700">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="md:hidden mt-4 space-y-2">
            <Link href="/" className="block py-2 text-sm font-medium hover:text-fuchsia-600">
              Home
            </Link>
            <Link href="/products" className="block py-2 text-sm font-medium hover:text-fuchsia-600">
              Products
            </Link>
            <Link href="/sellers" className="block py-2 text-sm font-medium hover:text-fuchsia-600">
              Sellers
            </Link>
            <Link href="/contact" className="block py-2 text-sm font-medium hover:text-fuchsia-600">
              Contact
            </Link>
            {user?.role === 'seller' && (
              <Link href="/dashboard" className="block py-2 text-sm font-medium hover:text-fuchsia-600">
                Dashboard
              </Link>
            )}
            {user && user.role !== 'seller' && (
              <Link href="/become-seller" className="block py-2 text-sm font-medium hover:text-fuchsia-600">
                Become a Seller
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
