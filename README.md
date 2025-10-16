# LocalConnectSA - The SME Growth Hub

A modern, full-featured South African online marketplace platform built with Next.js, React, and Tailwind CSS. Connect, trade, and collaborate with verified South African businesses.

## 🌟 Live Demo

**[Visit LocalConnectSA](https://localconnectsa.lindy.site)**

## ✨ Features

### For Customers
- 🛍️ **Browse Products** - Explore thousands of products from verified sellers
- 🔍 **Advanced Search & Filtering** - Find exactly what you need by category, price, and rating
- 🛒 **Shopping Cart** - Add items, manage quantities, and checkout seamlessly
- ⭐ **Seller Ratings** - View verified sellers with customer reviews and ratings
- 🌙 **Dark/Light Mode** - Toggle between themes for comfortable browsing
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile

### For Sellers
- 📊 **Seller Dashboard** - Manage products, orders, and sales analytics
- 📦 **Product Management** - Add, edit, and manage your product listings
- 💰 **Sales Tracking** - Monitor revenue and order history
- ⭐ **Seller Profile** - Build your reputation with customer reviews
- 🔐 **Verification Badge** - Get verified to increase customer trust

### For Admins
- 🎛️ **Admin Dashboard** - Manage platform, users, products, and sellers
- 📈 **Analytics** - View platform statistics and performance metrics
- 👥 **User Management** - Manage customers, sellers, and admin accounts
- 🛡️ **Moderation Tools** - Review and approve seller listings

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Bun
- PostgreSQL 12+
- Git

### Installation

1. **Clone the repository**
```bash
cd /home/code/local-connect-sa
```

2. **Install dependencies**
```bash
bun install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Update `.env.local` with your configuration:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/local_connect_sa
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Run the development server**
```bash
bun run dev
```

5. **Open in browser**
Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
local-connect-sa/
├── app/                          # Next.js app router
│   ├── (auth)/
│   │   ├── login/               # Login page
│   │   └── signup/              # Sign up page
│   ├── admin/                   # Admin dashboard
│   ├── dashboard/               # Seller dashboard
│   ├── products/                # Products listing
│   ├── sellers/                 # Sellers listing
│   ├── cart/                    # Shopping cart
│   ├── contact/                 # Contact page
│   ├── layout.tsx               # Root layout
│   └── page.tsx                 # Home page
├── components/
│   ├── common/
│   │   ├── Navbar.tsx           # Navigation bar
│   │   └── Footer.tsx           # Footer
│   ├── features/
│   │   ├── ProductCard.tsx      # Product display card
│   │   ├── SellerCard.tsx       # Seller profile card
│   │   └── CategoryCard.tsx     # Category card
│   ├── ui/                      # shadcn/ui components
│   └── theme-provider.tsx       # Theme provider
├── lib/
│   ├── api/
│   │   └── client.ts            # API client setup
│   ├── db/
│   │   └── schema.sql           # Database schema
│   ├── store/
│   │   └── useStore.ts          # Zustand store
│   └── utils.ts                 # Utility functions
├── data/
│   └── mockData.ts              # Mock products & sellers
├── types/
│   └── index.ts                 # TypeScript interfaces
├── public/                      # Static assets
├── SETUP_GUIDE.md               # Detailed setup guide
├── BACKEND_INTEGRATION.md       # Backend integration guide
└── README.md                    # This file
```

## 🛠️ Tech Stack

- **Frontend Framework**: Next.js 15 with App Router
- **UI Library**: React 19
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand
- **Database**: PostgreSQL
- **Authentication**: Mock (ready for Supabase/Firebase)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Package Manager**: Bun

## 🎨 Design System

### Colors
- **Primary**: Fuchsia (#EC4899)
- **Secondary**: Purple (#A855F7)
- **Dark Background**: Slate-950 (#030712)
- **Light Background**: White (#FFFFFF)

### Components
All UI components are built with shadcn/ui and Tailwind CSS:
- Button
- Input
- Card
- Badge
- And more...

## 📊 Database Schema

### Tables
- **users** - User accounts with roles (customer, seller, admin)
- **sellers** - Seller profiles with business info
- **products** - Product listings with pricing and stock
- **cart_items** - Shopping cart items
- **orders** - Order history
- **order_items** - Order line items

## 🔐 Authentication

Currently using mock authentication. Ready to integrate with:
- **Supabase** (PostgreSQL + Auth)
- **Firebase** (Firestore + Auth)
- **Custom Backend** (Node.js + JWT)

See [BACKEND_INTEGRATION.md](./BACKEND_INTEGRATION.md) for detailed integration guides.

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Push to GitHub
git push origin main

# Connect to Vercel
# Set environment variables
# Deploy
```

### Docker
```bash
docker build -t localconnectsa .
docker run -p 3000:3000 localconnectsa
```

## 📚 Documentation

- [Setup Guide](./SETUP_GUIDE.md) - Detailed setup and configuration
- [Backend Integration](./BACKEND_INTEGRATION.md) - Connect to backend services
- [API Documentation](./lib/api/README.md) - API endpoints and usage

## 🧪 Testing

```bash
# Run tests
bun run test

# Run tests in watch mode
bun run test:watch

# Generate coverage report
bun run test:coverage
```

## 📝 Available Scripts

```bash
# Development
bun run dev          # Start dev server
bun run build        # Build for production
bun run start        # Start production server
bun run lint         # Run ESLint
bun run type-check   # Check TypeScript types

# Database
bun run db:migrate   # Run migrations
bun run db:seed      # Seed database
bun run db:reset     # Reset database
```

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Core marketplace functionality
- ✅ Product browsing and search
- ✅ Shopping cart
- ✅ User authentication UI
- ✅ Seller profiles
- ✅ Admin dashboard

### Phase 2
- 🔄 Real authentication (Supabase/Firebase)
- 🔄 Payment processing (Stripe/PayPal)
- 🔄 Order management
- 🔄 Email notifications
- 🔄 Advanced search (Elasticsearch)

### Phase 3
- 📋 Messaging system
- 📋 Reviews and ratings
- 📋 Wishlist
- 📋 Analytics dashboard
- 📋 Mobile app

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 💬 Support

For support, email support@localconnectsa.com or open an issue on GitHub.

## 👥 Team

- **Project Lead**: Njabulo Moyani
- **Email**: elevatedigitalstore@gmail.com
- **Location**: South Africa (Africa/Johannesburg)

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [shadcn/ui](https://ui.shadcn.com/) - Component library
- [Zustand](https://github.com/pmndrs/zustand) - State management
- [Framer Motion](https://www.framer.com/motion/) - Animation library

---

**Made with ❤️ for South African SMEs**

Last Updated: October 2025
Version: 1.0.0
