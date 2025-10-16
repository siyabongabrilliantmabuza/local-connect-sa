'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { useStore } from '@/lib/store/useStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Menu, X, Moon, Sun, ShoppingCart, Heart, LogOut, Store } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { user, logout, cartItems } = useStore();

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white dark:bg-slate-950 transition-colors">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
            <div className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-fuchsia-600 to-purple-600 bg-clip-text text-transparent">
              LocalConnectSA
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 flex-1 ml-8">
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
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search - Desktop */}
            <div className="hidden lg:flex items-center">
              <Input
                type="text"
                placeholder="Search products..."
                className="w-48 lg:w-64 rounded-full text-sm"
              />
            </div>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full h-9 w-9 sm:h-10 sm:w-10"
              title="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-4 w-4 sm:h-5 sm:w-5" />
              ) : (
                <Moon className="h-4 w-4 sm:h-5 sm:w-5" />
              )}
            </Button>

            {/* Wishlist */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="rounded-full h-9 w-9 sm:h-10 sm:w-10 hidden sm:flex"
              title="Wishlist"
            >
              <Heart className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>

            {/* Cart */}
            <Link href="/cart">
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full h-9 w-9 sm:h-10 sm:w-10 relative"
                title="Shopping cart"
              >
                <ShoppingCart className="h-4 w-4 sm:h-5 sm:w-5" />
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                    {cartItems.length}
                  </span>
                )}
              </Button>
            </Link>

            {/* Auth */}
            {user ? (
              <div className="flex items-center gap-1 sm:gap-2">
                <span className="text-xs sm:text-sm font-medium hidden sm:inline truncate max-w-[100px]">
                  {user.full_name}
                </span>
                {user.role !== 'seller' && (
                  <Link href="/become-seller" className="hidden sm:block">
                    <Button size="sm" variant="outline" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
                      <Store className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span className="hidden sm:inline">Sell</span>
                    </Button>
                  </Link>
                )}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={logout}
                  className="rounded-full h-9 w-9 sm:h-10 sm:w-10"
                  title="Logout"
                >
                  <LogOut className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-1 sm:gap-2">
                <Link href="/auth/login" className="hidden sm:block">
                  <Button variant="outline" size="sm" className="text-xs sm:text-sm">
                    Login
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm" className="bg-fuchsia-600 hover:bg-fuchsia-700 text-xs sm:text-sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden h-9 w-9 sm:h-10 sm:w-10"
              onClick={() => setIsOpen(!isOpen)}
              title="Toggle menu"
            >
              {isOpen ? <X className="h-4 w-4 sm:h-5 sm:w-5" /> : <Menu className="h-4 w-4 sm:h-5 sm:w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <nav className="md:hidden mt-3 sm:mt-4 space-y-2 pb-3 sm:pb-4 border-t pt-3 sm:pt-4">
            <Link href="/" className="block py-2 text-sm font-medium hover:text-fuchsia-600 transition">
              Home
            </Link>
            <Link href="/products" className="block py-2 text-sm font-medium hover:text-fuchsia-600 transition">
              Products
            </Link>
            <Link href="/sellers" className="block py-2 text-sm font-medium hover:text-fuchsia-600 transition">
              Sellers
            </Link>
            <Link href="/contact" className="block py-2 text-sm font-medium hover:text-fuchsia-600 transition">
              Contact
            </Link>
            {user?.role === 'seller' && (
              <Link href="/dashboard" className="block py-2 text-sm font-medium hover:text-fuchsia-600 transition">
                Dashboard
              </Link>
            )}
            {user && user.role !== 'seller' && (
              <Link href="/become-seller" className="block py-2 text-sm font-medium hover:text-fuchsia-600 transition">
                Become a Seller
              </Link>
            )}
            {!user && (
              <Link href="/auth/login" className="block py-2 text-sm font-medium hover:text-fuchsia-600 transition">
                Login
              </Link>
            )}
            <div className="pt-2 border-t">
              <Link href="/cart" className="block py-2 text-sm font-medium hover:text-fuchsia-600 transition">
                Cart {cartItems.length > 0 && `(${cartItems.length})`}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
