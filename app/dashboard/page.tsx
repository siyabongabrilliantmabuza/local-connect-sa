'use client';

import { useStore } from '@/lib/store/useStore';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { BarChart3, Package, TrendingUp, Users } from 'lucide-react';

export default function SellerDashboard() {
  const { user } = useStore();
  const router = useRouter();

  if (!user) {
    router.push('/auth/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Dashboard Header */}
      <div className="bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Seller Dashboard</h1>
          <p className="text-gray-100">Welcome back, {user.full_name}!</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Total Sales</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">R12,450</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Products Listed</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">24</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Total Orders</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">156</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Customers</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">89</p>
              </div>
              <Users className="h-8 w-8 text-amber-600" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <Button className="w-full bg-fuchsia-600 hover:bg-fuchsia-700">
                Add New Product
              </Button>
              <Button variant="outline" className="w-full">
                View Orders
              </Button>
              <Button variant="outline" className="w-full">
                Manage Inventory
              </Button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Recent Orders
            </h3>
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded">
                <p className="text-sm font-medium text-slate-900 dark:text-white">Order #1234</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">R2,450 - Pending</p>
              </div>
              <div className="p-3 bg-slate-50 dark:bg-slate-700 rounded">
                <p className="text-sm font-medium text-slate-900 dark:text-white">Order #1233</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">R1,890 - Completed</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Performance
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Rating</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">4.8/5.0</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Response Time</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">2.5 hours</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
