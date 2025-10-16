'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/features/ProductCard';
import SellerCard from '@/components/features/SellerCard';
import CategoryCard from '@/components/features/CategoryCard';
import { mockProducts, mockSellers, categories } from '@/data/mockData';
import { Star } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Grow Your Business Locally
              </h1>
              <p className="text-xl mb-6 text-gray-100">
                Connect, trade and collaborate with verified South African businesses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/products">
                  <Button size="lg" className="bg-white text-fuchsia-700 hover:bg-gray-100 w-full sm:w-auto">
                    Start Shopping
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-fuchsia-700 w-full sm:w-auto"
                  >
                    Become a Seller
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="http://static.photos/business/640x360/10"
                alt="Local Business Network"
                className="rounded-lg shadow-xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 md:py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.name}
              name={category.name}
              icon={category.icon}
            />
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 md:py-16 container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Featured Products
          </h2>
          <Link href="/products" className="text-fuchsia-600 dark:text-fuchsia-400 font-semibold hover:underline">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mockProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Top Sellers Section */}
      <section className="py-12 md:py-16 container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Top Sellers
          </h2>
          <Link href="/sellers" className="text-fuchsia-600 dark:text-fuchsia-400 font-semibold hover:underline">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {mockSellers.map((seller) => (
            <SellerCard key={seller.id} seller={seller} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-fuchsia-700 text-white py-12 md:py-16 container mx-auto px-4 rounded-xl my-12">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to grow your business?
          </h2>
          <p className="text-xl mb-6 text-gray-100">
            Join LocalConnectSA - the platform designed for South African SMEs.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="bg-white text-fuchsia-700 hover:bg-gray-100">
              Join Our Network
            </Button>
          </Link>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-slate-900 dark:text-white">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Mpumelelo Traders',
              rating: 5,
              text: 'LocalConnectSA helped us find reliable suppliers right in our province. Our transportation costs dropped by 40%!',
            },
            {
              name: 'Khanyisa Foods',
              rating: 4.5,
              text: 'The business management tools helped us streamline our operations. We&apos;ve grown our revenue by 35% since joining.',
            },
            {
              name: 'Ndlovu Constructions',
              rating: 5,
              text: 'Finding local suppliers through LocalConnectSA has transformed our supply chain. The escrow payment system gives us peace of mind.',
            },
          ].map((testimonial, i) => (
            <div
              key={i}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-md p-6"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <img
                    src={`http://static.photos/business/200x200/${i + 6}`}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">
                    {testimonial.name}
                  </h4>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, j) => (
                      <Star
                        key={j}
                        className={`h-4 w-4 ${
                          j < Math.floor(testimonial.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-gray-300 dark:text-gray-600'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                &quot;{testimonial.text}&quot;
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
