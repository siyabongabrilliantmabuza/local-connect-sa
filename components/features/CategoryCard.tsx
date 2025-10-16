'use client';

import Link from 'next/link';
import { Factory, Leaf, UtensilsCrossed, Hammer, Briefcase, Truck } from 'lucide-react';

interface CategoryCardProps {
  name: string;
  icon: string;
}

const iconMap: Record<string, React.ReactNode> = {
  factory: <Factory className="h-8 w-8" />,
  leaf: <Leaf className="h-8 w-8" />,
  utensils: <UtensilsCrossed className="h-8 w-8" />,
  hammer: <Hammer className="h-8 w-8" />,
  briefcase: <Briefcase className="h-8 w-8" />,
  truck: <Truck className="h-8 w-8" />,
};

const colorMap: Record<string, string> = {
  factory: 'bg-fuchsia-900 text-fuchsia-400',
  leaf: 'bg-green-900 text-green-400',
  utensils: 'bg-yellow-900 text-yellow-400',
  hammer: 'bg-red-900 text-red-400',
  briefcase: 'bg-purple-900 text-purple-400',
  truck: 'bg-teal-900 text-teal-400',
};

export default function CategoryCard({ name, icon }: CategoryCardProps) {
  return (
    <Link href={`/products?category=${name}`}>
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-4 text-center hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1">
        <div className={`rounded-full p-3 w-16 h-16 flex items-center justify-center mx-auto mb-3 ${colorMap[icon] || 'bg-slate-900 text-slate-400'}`}>
          {iconMap[icon] || <Factory className="h-8 w-8" />}
        </div>
        <h3 className="font-semibold text-slate-900 dark:text-white text-sm">
          {name}
        </h3>
      </div>
    </Link>
  );
}
