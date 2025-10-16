'use client';

import Image from 'next/image';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { useStore } from '@/lib/store/useStore';
import { ShoppingCart, Star } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useStore();
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Image */}
      <div className="relative h-48 bg-gray-200 dark:bg-slate-700 overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        {product.badge && (
          <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {product.badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white">
              {product.name}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {product.category}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center">
          <div>
            <span className="text-fuchsia-600 dark:text-fuchsia-400 font-bold text-lg">
              R{product.price}
            </span>
          </div>
          <Button
            size="sm"
            onClick={handleAddToCart}
            className={`rounded-full transition-all ${
              isAdded
                ? 'bg-green-500 hover:bg-green-600'
                : 'bg-fuchsia-600 hover:bg-fuchsia-700'
            }`}
          >
            {isAdded ? (
              <span className="flex items-center gap-1">
                <span>✓</span> Added
              </span>
            ) : (
              <ShoppingCart className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
