'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Seller } from '@/types';
import { Star, CheckCircle } from 'lucide-react';

interface SellerCardProps {
  seller: Seller;
}

export default function SellerCard({ seller }: SellerCardProps) {
  return (
    <Link href={`/sellers/${seller.id}`}>
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-4 text-center hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1">
        {/* Avatar */}
        <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-3 border-2 border-fuchsia-500">
          <img
            src={`http://static.photos/business/200x200/${seller.id}`}
            alt={seller.business_name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name */}
        <div className="flex items-center justify-center gap-2 mb-1">
          <h3 className="font-semibold text-slate-900 dark:text-white">
            {seller.business_name}
          </h3>
          {seller.verified && (
            <CheckCircle className="h-4 w-4 text-blue-500" />
          )}
        </div>

        {/* Category */}
        <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
          {seller.category}
        </p>

        {/* Rating */}
        <div className="flex justify-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(seller.rating)
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-gray-300 dark:text-gray-600'
              }`}
            />
          ))}
        </div>

        {/* Reviews */}
        <p className="text-xs text-slate-600 dark:text-slate-400">
          {seller.total_reviews} reviews
        </p>
      </div>
    </Link>
  );
}
