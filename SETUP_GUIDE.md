# LocalConnectSA - React + Tailwind Setup Guide

## Project Overview

LocalConnectSA is a modern South African online marketplace platform built with:
- **Frontend**: Next.js 14 + React + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand
- **Database**: PostgreSQL
- **Authentication**: Mock (ready for Supabase/Firebase integration)
- **Animations**: Framer Motion

## Prerequisites

- Node.js 18+ or Bun
- PostgreSQL 12+
- Git

## Installation & Setup

### 1. Clone and Install Dependencies

```bash
cd /home/code/local-connect-sa
bun install
```

### 2. Database Setup

The database schema has already been created. To verify:

```bash
PGPASSWORD=HAIYBOhUcoRZng4TRG5EDTpT psql -h localhost -U sandbox -d local_connect_sa -c "\dt"
```

### 3. Environment Variables

Update `.env.local` with your configuration:

```env
# Database
DATABASE_URL=postgresql://sandbox:HAIYBOhUcoRZng4TRG5EDTpT@localhost:5432/local_connect_sa

# Supabase (Optional - for authentication)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run Development Server

```bash
bun run dev
```

The app will be available at `http://localhost:3000`

## Project Structure

```
local-connect-sa/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   └── signup/
│   ├── admin/              # Admin dashboard
│   ├── dashboard/          # Seller dashboard
│   ├── products/           # Products listing
│   ├── sellers/            # Sellers listing
│   ├── cart/               # Shopping cart
│   ├── contact/            # Contact page
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/
│   ├── common/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── features/
│   │   ├── ProductCard.tsx
│   │   ├── SellerCard.tsx
│   │   └── CategoryCard.tsx
│   ├── ui/                 # shadcn/ui components
│   └── theme-provider.tsx
├── lib/
│   ├── api/
│   │   └── client.ts       # API client setup
│   ├── db/
│   │   └── schema.sql      # Database schema
│   ├── store/
│   │   └── useStore.ts     # Zustand store
│   └── utils.ts
├── data/
│   └── mockData.ts         # Mock products & sellers
├── types/
│   └── index.ts            # TypeScript types
└── public/                 # Static assets
```

## Key Features

### 1. **Authentication**
- Login/Signup pages with form validation
- Mock authentication (ready for Supabase/Firebase)
- User state persisted in localStorage
- Role-based access (customer, seller, admin)

### 2. **Product Management**
- Browse products with filtering
- Search by name or category
- Product cards with ratings and pricing
- Add to cart functionality

### 3. **Seller Management**
- View all sellers with ratings
- Filter sellers by category
- Seller verification badges
- Seller dashboard for managing products

### 4. **Shopping Cart**
- Add/remove items
- Update quantities
- Persistent cart state (localStorage)
- Order summary with totals

### 5. **Admin Dashboard**
- Overview statistics
- Product management (CRUD)
- Seller management
- User management interface

### 6. **Theme Support**
- Dark/Light mode toggle
- Persistent theme preference
- Smooth transitions

## API Integration

### Mock Data
Currently using mock data from `data/mockData.ts`. To connect to real API:

1. Update `lib/api/client.ts` with your API endpoints
2. Replace mock data calls with API calls
3. Update Zustand store to fetch from API

### Example API Integration

```typescript
// lib/api/products.ts
import apiClient from './client';
import { Product } from '@/types';

export const getProducts = async (): Promise<Product[]> => {
  const response = await apiClient.get('/products');
  return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await apiClient.get(`/products/${id}`);
  return response.data;
};
```

## Backend Integration Options

### Option 1: Supabase (Recommended)

1. Create a Supabase project at https://supabase.com
2. Update `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```
3. Install Supabase client:
   ```bash
   bun add @supabase/supabase-js
   ```
4. Create auth service:
   ```typescript
   // lib/supabase.ts
   import { createClient } from '@supabase/supabase-js';
   
   export const supabase = createClient(
     process.env.NEXT_PUBLIC_SUPABASE_URL!,
     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
   );
   ```

### Option 2: Firebase

1. Create Firebase project at https://firebase.google.com
2. Install Firebase:
   ```bash
   bun add firebase
   ```
3. Create auth service:
   ```typescript
   // lib/firebase.ts
   import { initializeApp } from 'firebase/app';
   import { getAuth } from 'firebase/auth';
   
   const firebaseConfig = {
     // Your config
   };
   
   const app = initializeApp(firebaseConfig);
   export const auth = getAuth(app);
   ```

### Option 3: Custom Node.js Backend

1. Create API routes in `app/api/`
2. Connect to PostgreSQL database
3. Implement authentication with JWT tokens

## Database Schema

The PostgreSQL database includes:
- **users**: User accounts with roles
- **sellers**: Seller profiles
- **products**: Product listings
- **cart_items**: Shopping cart items
- **orders**: Order history
- **order_items**: Order line items

## Deployment

### Vercel (Recommended for Next.js)

1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables
4. Deploy

### Docker

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN bun install
RUN bun run build
EXPOSE 3000
CMD ["bun", "run", "start"]
```

## Development Tips

### Adding New Pages
1. Create folder in `app/` directory
2. Add `page.tsx` file
3. Use existing components

### Adding New Components
1. Create in `components/features/` or `components/common/`
2. Export from component file
3. Import in pages

### State Management
Use Zustand store for global state:
```typescript
import { useStore } from '@/lib/store/useStore';

const { user, cartItems, addToCart } = useStore();
```

### Styling
Use Tailwind CSS classes:
```tsx
<div className="bg-white dark:bg-slate-800 rounded-lg p-6">
  Content
</div>
```

## Troubleshooting

### Database Connection Issues
```bash
# Test connection
PGPASSWORD=HAIYBOhUcoRZng4TRG5EDTpT psql -h localhost -U sandbox -d local_connect_sa
```

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
bun run build
```

## Next Steps

1. **Connect to Supabase/Firebase** for real authentication
2. **Implement payment processing** (Stripe, PayPal)
3. **Add email notifications** (SendGrid, Mailgun)
4. **Set up analytics** (Google Analytics, Mixpanel)
5. **Implement search** (Elasticsearch, Algolia)
6. **Add image uploads** (Cloudinary, AWS S3)

## Support

For issues or questions, contact: support@localconnectsa.com

---

**Last Updated**: October 2025
**Version**: 1.0.0
