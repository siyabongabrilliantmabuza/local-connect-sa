'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/features/ProductCard';
import SellerCard from '@/components/features/SellerCard';
import CategoryCard from '@/components/features/CategoryCard';
import { mockProducts, mockSellers, categories } from '@/data/mockData';
import { Star, TrendingUp, Users, Shield } from 'lucide-react';

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
                <Link href="/become-seller">
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

      {/* Become a Seller CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-purple-600 to-fuchsia-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Ready to Sell?
            </h2>
            <p className="text-xl mb-8 text-gray-100">
              Join thousands of successful sellers on LocalConnectSA. Reach more customers, grow your business, and earn more.
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <TrendingUp className="h-12 w-12 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">Grow Your Sales</h3>
                <p className="text-gray-100">Reach thousands of customers across South Africa</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <Users className="h-12 w-12 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">Build Your Brand</h3>
                <p className="text-gray-100">Create a professional seller profile and build trust</p>
              </div>
              <div className="bg-white/10 backdrop-blur rounded-lg p-6">
                <Shield className="h-12 w-12 mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-2">Secure Payments</h3>
                <p className="text-gray-100">Get paid safely with our secure payment system</p>
              </div>
            </div>

            <Link href="/become-seller">
              <Button size="lg" className="bg-white text-fuchsia-700 hover:bg-gray-100">
                Start Selling Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 md:py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-slate-900 dark:text-white">
          What Our Sellers Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: 'Thabo Mthembu',
              role: 'Electronics Seller',
              testimonial: 'LocalConnectSA helped me reach customers I never could have found before. My sales have tripled!',
              rating: 5,
            },
            {
              name: 'Naledi Khumalo',
              role: 'Fashion Entrepreneur',
              testimonial: 'The platform is easy to use and the support team is amazing. Highly recommended for any seller!',
              rating: 5,
            },
            {
              name: 'Sipho Ndlela',
              role: 'Home & Garden',
              testimonial: 'Best decision I made for my business. The verification process gave me credibility with customers.',
              rating: 5,
            },
          ].map((testimonial, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 rounded-lg p-6">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                &quot;{testimonial.testimonial}&quot;
              </p>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">
                  {testimonial.name}
                </p>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16 container mx-auto px-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
        <h2 className="text-3xl font-bold mb-8 text-center text-slate-900 dark:text-white">
          Frequently Asked Questions
        </h2>
        <div className="max-w-2xl mx-auto space-y-4">
          {[
            {
              question: 'How do I become a seller?',
              answer: 'Click on &quot;Become a Seller&quot; and fill out the registration form with your business information. Our team will verify your details and you&apos;ll be ready to start selling!',
            },
            {
              question: 'What are the fees?',
              answer: 'We charge a small commission on each sale. Check our pricing page for detailed information.',
            },
            {
              question: 'How do I get paid?',
              answer: 'We deposit earnings directly to your bank account every week. You can track your earnings in your seller dashboard.',
            },
            {
              question: 'Is my business information secure?',
              answer: 'Yes! We use industry-standard encryption to protect all your business and payment information.',
            },
          ].map((faq, index) => (
            <div key={index} className="bg-white dark:bg-slate-800 rounded-lg p-6">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                {faq.question}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
