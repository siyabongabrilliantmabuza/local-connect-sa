# LocalConnectSA - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### 1. Navigate to Project
```bash
cd /home/code/local-connect-sa
```

### 2. Install Dependencies
```bash
bun install
```

### 3. Start Development Server
```bash
bun run dev
```

### 4. Open in Browser
```
http://localhost:3000
```

---

## 📋 Common Commands

### Development
```bash
bun run dev              # Start dev server
bun run build            # Build for production
bun run start            # Start production server
bun run lint             # Run ESLint
bun run type-check       # Check TypeScript
```

### Database
```bash
# Connect to PostgreSQL
PGPASSWORD=HAIYBOhUcoRZng4TRG5EDTpT psql -h localhost -U sandbox -d local_connect_sa

# View tables
\dt

# Exit
\q
```

### Useful Shortcuts
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# View server logs
tail -f server.log

# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules
bun install
```

---

## 🗂️ Project Structure Quick Reference

```
app/                    # Pages and routes
├── page.tsx            # Home page
├── products/           # Products page
├── sellers/            # Sellers page
├── cart/               # Shopping cart
├── contact/            # Contact page
├── auth/               # Authentication
│   ├── login/
│   └── signup/
├── admin/              # Admin dashboard
├── dashboard/          # Seller dashboard
└── layout.tsx          # Root layout

components/            # Reusable components
├── common/
│   ├── Navbar.tsx
│   └── Footer.tsx
├── features/
│   ├── ProductCard.tsx
│   ├── SellerCard.tsx
│   └── CategoryCard.tsx
└── ui/                # shadcn/ui components

lib/                   # Utilities and logic
├── api/               # API client
├── db/                # Database schema
├── store/             # Zustand store
└── utils.ts

data/                  # Mock data
└── mockData.ts

types/                 # TypeScript types
└── index.ts
```

---

## 🎨 Styling Quick Reference

### Tailwind Classes
```tsx
// Colors
bg-fuchsia-600        // Background
text-white            // Text
border-slate-300      // Border

// Spacing
p-4                   // Padding
m-2                   // Margin
gap-4                 // Gap

// Layout
flex                  // Flexbox
grid                  // Grid
container             // Container

// Responsive
md:grid-cols-2        // Medium screens
lg:grid-cols-4        // Large screens
```

### Dark Mode
```tsx
// Automatically applies in dark mode
dark:bg-slate-800
dark:text-white
dark:border-slate-600
```

---

## 🔧 Environment Variables

Create `.env.local`:
```env
# Database
DATABASE_URL=postgresql://sandbox:HAIYBOhUcoRZng4TRG5EDTpT@localhost:5432/local_connect_sa

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Optional: Backend Services
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_FIREBASE_API_KEY=
```

---

## 📱 Testing Pages

### Home Page
- URL: `http://localhost:3000`
- Features: Hero, categories, products, sellers, testimonials

### Products
- URL: `http://localhost:3000/products`
- Features: Search, filtering, product cards, add to cart

### Sellers
- URL: `http://localhost:3000/sellers`
- Features: Seller directory, filtering, ratings

### Cart
- URL: `http://localhost:3000/cart`
- Features: Cart items, quantity management, checkout

### Contact
- URL: `http://localhost:3000/contact`
- Features: Contact form, information

### Auth
- Login: `http://localhost:3000/auth/login`
- Signup: `http://localhost:3000/auth/signup`

### Admin
- URL: `http://localhost:3000/admin`
- Features: Dashboard, product management, seller management

### Seller Dashboard
- URL: `http://localhost:3000/dashboard`
- Features: Sales, products, orders, performance

---

## 🎯 Key Features to Test

### 1. Navigation
- [ ] Click all navbar links
- [ ] Test search functionality
- [ ] Check responsive menu on mobile

### 2. Theme Toggle
- [ ] Click theme button
- [ ] Verify dark/light mode switch
- [ ] Check persistence on refresh

### 3. Shopping Cart
- [ ] Add items to cart
- [ ] View cart counter
- [ ] Update quantities
- [ ] Remove items

### 4. Filtering
- [ ] Filter products by category
- [ ] Search products
- [ ] Filter sellers by category

### 5. Forms
- [ ] Fill contact form
- [ ] Test signup form
- [ ] Test login form

### 6. Responsive Design
- [ ] Test on mobile (< 640px)
- [ ] Test on tablet (640px - 1024px)
- [ ] Test on desktop (> 1024px)

---

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

### Build Errors
```bash
# Clear cache and rebuild
rm -rf .next
bun run build
```

### Dependencies Issues
```bash
# Reinstall dependencies
rm -rf node_modules
bun install
```

### Database Connection
```bash
# Test connection
PGPASSWORD=HAIYBOhUcoRZng4TRG5EDTpT psql -h localhost -U sandbox -d local_connect_sa -c "SELECT 1"
```

---

## 📚 Documentation Files

- **README.md** - Project overview
- **SETUP_GUIDE.md** - Detailed setup
- **BACKEND_INTEGRATION.md** - Backend options
- **PROJECT_SUMMARY.md** - Completion summary
- **QUICK_START.md** - This file

---

## 🔗 Useful Links

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)
- [Zustand](https://github.com/pmndrs/zustand)

---

## 💡 Tips & Tricks

### Hot Reload
- Changes to files automatically reload in browser
- No need to restart server

### TypeScript
- Hover over variables to see types
- Use Ctrl+Space for autocomplete

### Tailwind
- Use `@apply` for custom classes
- Use `dark:` prefix for dark mode

### Components
- Import from `@/components/...`
- Use relative imports for local files

---

## 🎓 Next Steps

1. **Explore the Code** - Read through components and pages
2. **Modify Styling** - Change colors and layouts
3. **Add Features** - Create new pages and components
4. **Connect Backend** - Follow BACKEND_INTEGRATION.md
5. **Deploy** - Push to production

---

## ❓ Need Help?

1. Check documentation files
2. Review code comments
3. Check browser console for errors
4. Check terminal for build errors
5. Contact: support@localconnectsa.com

---

**Happy Coding! 🚀**

Last Updated: October 16, 2025
