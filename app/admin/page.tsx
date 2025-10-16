'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { mockProducts, mockSellers } from '@/data/mockData';
import { Users, Package, Store, TrendingUp, Trash2, Edit } from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'sellers' | 'users'>('overview');

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-fuchsia-600 to-purple-600 text-white py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-100">Manage your LocalConnectSA platform</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Total Users</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">1,234</p>
              </div>
              <Users className="h-8 w-8 text-fuchsia-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Total Products</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{mockProducts.length}</p>
              </div>
              <Package className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Total Sellers</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">{mockSellers.length}</p>
              </div>
              <Store className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Revenue</p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">R45.2K</p>
              </div>
              <TrendingUp className="h-8 w-8 text-amber-600" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 font-medium border-b-2 transition ${
              activeTab === 'overview'
                ? 'border-fuchsia-600 text-fuchsia-600'
                : 'border-transparent text-slate-600 dark:text-slate-400'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 font-medium border-b-2 transition ${
              activeTab === 'products'
                ? 'border-fuchsia-600 text-fuchsia-600'
                : 'border-transparent text-slate-600 dark:text-slate-400'
            }`}
          >
            Products
          </button>
          <button
            onClick={() => setActiveTab('sellers')}
            className={`px-4 py-2 font-medium border-b-2 transition ${
              activeTab === 'sellers'
                ? 'border-fuchsia-600 text-fuchsia-600'
                : 'border-transparent text-slate-600 dark:text-slate-400'
            }`}
          >
            Sellers
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 font-medium border-b-2 transition ${
              activeTab === 'users'
                ? 'border-fuchsia-600 text-fuchsia-600'
                : 'border-transparent text-slate-600 dark:text-slate-400'
            }`}
          >
            Users
          </button>
        </div>

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
              Platform Overview
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              Welcome to the LocalConnectSA admin dashboard. Here you can manage all aspects of the platform.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="font-semibold text-blue-900 dark:text-blue-400 mb-2">Recent Activity</h3>
                <p className="text-sm text-blue-800 dark:text-blue-300">12 new users joined today</p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h3 className="font-semibold text-green-900 dark:text-green-400 mb-2">System Status</h3>
                <p className="text-sm text-green-800 dark:text-green-300">All systems operational</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Products Management
              </h2>
              <Button className="bg-fuchsia-600 hover:bg-fuchsia-700">
                Add Product
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Category</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Price</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Stock</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockProducts.map((product) => (
                    <tr key={product.id} className="border-b border-slate-200 dark:border-slate-700">
                      <td className="py-3 px-4 text-slate-900 dark:text-white">{product.name}</td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{product.category}</td>
                      <td className="py-3 px-4 text-slate-900 dark:text-white">R{product.price}</td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{product.stock}</td>
                      <td className="py-3 px-4 flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'sellers' && (
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Sellers Management
              </h2>
              <Button className="bg-fuchsia-600 hover:bg-fuchsia-700">
                Add Seller
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Business Name</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Category</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Rating</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Verified</th>
                    <th className="text-left py-3 px-4 font-semibold text-slate-900 dark:text-white">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {mockSellers.map((seller) => (
                    <tr key={seller.id} className="border-b border-slate-200 dark:border-slate-700">
                      <td className="py-3 px-4 text-slate-900 dark:text-white">{seller.business_name}</td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">{seller.category}</td>
                      <td className="py-3 px-4 text-slate-900 dark:text-white">{seller.rating}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          seller.verified
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                        }`}>
                          {seller.verified ? 'Verified' : 'Pending'}
                        </span>
                      </td>
                      <td className="py-3 px-4 flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6">
              Users Management
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              User management features coming soon...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
