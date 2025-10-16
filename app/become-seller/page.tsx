'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useStore } from '@/lib/store/useStore';
import { ArrowLeft, CheckCircle, AlertCircle } from 'lucide-react';

export default function BecomeSellerPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    businessName: '',
    businessCategory: 'Electronics',
    businessDescription: '',
    businessPhone: '',
    businessEmail: '',
    businessAddress: '',
    businessCity: '',
    businessPostalCode: '',
    bankAccountName: '',
    bankAccountNumber: '',
    bankCode: '',
  });

  const { user, updateUserRole } = useStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.businessName.trim()) {
      setError('Business name is required');
      return false;
    }
    if (!formData.businessEmail.trim()) {
      setError('Business email is required');
      return false;
    }
    if (!formData.businessPhone.trim()) {
      setError('Business phone is required');
      return false;
    }
    if (!formData.businessAddress.trim()) {
      setError('Business address is required');
      return false;
    }
    if (!formData.businessCity.trim()) {
      setError('City is required');
      return false;
    }
    if (!formData.bankAccountName.trim()) {
      setError('Bank account name is required');
      return false;
    }
    if (!formData.bankAccountNumber.trim()) {
      setError('Bank account number is required');
      return false;
    }
    if (!formData.bankCode.trim()) {
      setError('Bank code is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Update user role to seller
      if (user) {
        updateUserRole('seller');
      }

      setIsSuccess(true);
    } catch (err) {
      setError('Failed to register as seller. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4 text-slate-900 dark:text-white">
            Please log in first
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            You need to be logged in to become a seller.
          </p>
          <Link href="/auth/login">
            <Button className="bg-fuchsia-600 hover:bg-fuchsia-700">
              Go to Login
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
        <div className="text-center max-w-md">
          <CheckCircle className="h-16 w-16 mx-auto mb-4 text-green-500" />
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Welcome to LocalConnectSA Sellers!
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mb-2">
            Your seller account has been created successfully
          </p>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            You can now start listing your products and managing your business
          </p>
          <div className="space-x-4">
            <Link href="/dashboard">
              <Button className="bg-fuchsia-600 hover:bg-fuchsia-700">
                Go to Seller Dashboard
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
      <div className="container mx-auto px-4 max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="flex items-center text-fuchsia-600 hover:text-fuchsia-700 mb-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Become a Seller
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Join our community of successful sellers and start growing your business today.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Error Alert */}
          {error && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-700 dark:text-red-400">{error}</p>
            </div>
          )}

          {/* Business Information Section */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              Business Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Business Name *
                </label>
                <Input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleInputChange}
                  placeholder="Enter your business name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Business Category *
                </label>
                <select
                  name="businessCategory"
                  value={formData.businessCategory}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="Electronics">Electronics</option>
                  <option value="Fashion">Fashion</option>
                  <option value="Home & Garden">Home & Garden</option>
                  <option value="Sports">Sports</option>
                  <option value="Books">Books</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Business Description
                </label>
                <textarea
                  name="businessDescription"
                  value={formData.businessDescription}
                  onChange={handleInputChange}
                  placeholder="Tell us about your business"
                  rows={4}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Contact Information Section */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-4">
              Contact Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Business Email *
                </label>
                <Input
                  type="email"
                  name="businessEmail"
                  value={formData.businessEmail}
                  onChange={handleInputChange}
                  placeholder="business@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Business Phone *
                </label>
                <Input
                  type="tel"
                  name="businessPhone"
                  value={formData.businessPhone}
                  onChange={handleInputChange}
                  placeholder="+27 123 456 7890"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Business Address *
                </label>
                <Input
                  type="text"
                  name="businessAddress"
                  value={formData.businessAddress}
                  onChange={handleInputChange}
                  placeholder="Street address"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    City *
                  </label>
                  <Input
                    type="text"
                    name="businessCity"
                    value={formData.businessCity}
                    onChange={handleInputChange}
                    placeholder="City"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Postal Code
                  </label>
                  <Input
                    type="text"
                    name="businessPostalCode"
                    value={formData.businessPostalCode}
                    onChange={handleInputChange}
                    placeholder="Postal code"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Banking Information Section */}
          <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Banking Information
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              This is where we&apos;ll deposit your earnings
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Account Holder Name *
                </label>
                <Input
                  type="text"
                  name="bankAccountName"
                  value={formData.bankAccountName}
                  onChange={handleInputChange}
                  placeholder="Full name on bank account"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Account Number *
                </label>
                <Input
                  type="text"
                  name="bankAccountNumber"
                  value={formData.bankAccountNumber}
                  onChange={handleInputChange}
                  placeholder="Bank account number"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Bank Code *
                </label>
                <Input
                  type="text"
                  name="bankCode"
                  value={formData.bankCode}
                  onChange={handleInputChange}
                  placeholder="Bank code"
                  required
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-fuchsia-600 hover:bg-fuchsia-700 text-white"
            >
              {isSubmitting ? 'Creating Account...' : 'Create Seller Account'}
            </Button>
            <Link href="/" className="flex-1">
              <Button variant="outline" className="w-full">
                Cancel
              </Button>
            </Link>
          </div>

          {/* Terms */}
          <p className="text-xs text-slate-600 dark:text-slate-400 text-center">
            By creating a seller account, you agree to our Terms of Service and Privacy Policy.
          </p>
        </form>
      </div>
    </div>
  );
}
