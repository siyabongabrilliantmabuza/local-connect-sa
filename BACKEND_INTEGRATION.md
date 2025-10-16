# Backend Integration Guide

## Overview

This guide explains how to connect LocalConnectSA frontend to a backend service for live data and authentication.

## Option 1: Supabase (Recommended for Quick Setup)

### Why Supabase?
- PostgreSQL database (same as our schema)
- Built-in authentication
- Real-time subscriptions
- Row-level security
- Free tier available

### Setup Steps

#### 1. Create Supabase Project
1. Go to https://supabase.com
2. Click "New Project"
3. Fill in project details
4. Wait for project to initialize

#### 2. Update Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

#### 3. Create Database Tables

Run the schema from `lib/db/schema.sql` in Supabase SQL Editor.

#### 4. Create Supabase Service

```typescript
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

#### 5. Update Authentication

```typescript
// lib/auth/supabase.ts
import { supabase } from '@/lib/supabase';

export const signUp = async (email: string, password: string, fullName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName }
    }
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  return { data, error };
};

export const signOut = async () => {
  return await supabase.auth.signOut();
};
```

#### 6. Update Product Fetching

```typescript
// lib/api/products.ts
import { supabase } from '@/lib/supabase';
import { Product } from '@/types';

export const getProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from('products')
    .select('*');
  
  if (error) throw error;
  return data || [];
};

export const getProductById = async (id: number): Promise<Product> => {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) throw error;
  return data;
};
```

---

## Option 2: Firebase

### Why Firebase?
- Easy authentication
- Real-time database
- Cloud functions
- Hosting included
- Generous free tier

### Setup Steps

#### 1. Create Firebase Project
1. Go to https://firebase.google.com
2. Click "Create a project"
3. Enable Firestore and Authentication

#### 2. Install Firebase

```bash
bun add firebase
```

#### 3. Create Firebase Config

```typescript
// lib/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

#### 4. Update Environment Variables

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-storage-bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

#### 5. Create Authentication Service

```typescript
// lib/auth/firebase.ts
import { auth } from '@/lib/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

export const signUp = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signIn = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
  return await signOut(auth);
};
```

---

## Option 3: Custom Node.js Backend

### Why Custom Backend?
- Full control
- Custom business logic
- Integration with existing systems
- Better for complex requirements

### Setup Steps

#### 1. Create Backend Project

```bash
mkdir local-connect-sa-backend
cd local-connect-sa-backend
npm init -y
npm install express cors dotenv pg bcryptjs jsonwebtoken
```

#### 2. Create Express Server

```typescript
// server.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const app = express();
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

app.use(cors());
app.use(express.json());

// Routes
app.get('/api/products', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Database error' });
  }
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});
```

#### 3. Create Authentication Routes

```typescript
// routes/auth.ts
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../db';

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { email, password, full_name } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const result = await pool.query(
      'INSERT INTO users (email, password_hash, full_name) VALUES ($1, $2, $3) RETURNING id, email, full_name',
      [email, hashedPassword, full_name]
    );
    
    const token = jwt.sign(
      { userId: result.rows[0].id },
      process.env.JWT_SECRET!
    );
    
    res.json({ user: result.rows[0], token });
  } catch (error) {
    res.status(400).json({ error: 'Signup failed' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = result.rows[0];
    const validPassword = await bcrypt.compare(password, user.password_hash);
    
    if (!validPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET!
    );
    
    res.json({ user, token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed' });
  }
});

export default router;
```

#### 4. Update Frontend API Client

```typescript
// lib/api/client.ts
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

export const apiClient = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;
```

---

## Comparison Table

| Feature | Supabase | Firebase | Custom Backend |
|---------|----------|----------|-----------------|
| Setup Time | 15 min | 20 min | 2-3 hours |
| Cost | Free tier | Free tier | Hosting cost |
| Database | PostgreSQL | Firestore | PostgreSQL |
| Authentication | Built-in | Built-in | Manual |
| Real-time | Yes | Yes | Optional |
| Scalability | High | High | Depends |
| Learning Curve | Low | Low | Medium |

---

## Migration from Mock Data

### Step 1: Update Store

```typescript
// lib/store/useStore.ts
import { useEffect } from 'react';

export const useStore = create<StoreState>()((set, get) => ({
  // ... existing code ...
  
  // Add effect to fetch from API
  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      set({ products });
    };
    fetchProducts();
  }, []);
}));
```

### Step 2: Update Components

```typescript
// components/features/ProductCard.tsx
import { useEffect, useState } from 'react';
import { getProductById } from '@/lib/api/products';

export default function ProductCard({ productId }: { productId: number }) {
  const [product, setProduct] = useState(null);
  
  useEffect(() => {
    getProductById(productId).then(setProduct);
  }, [productId]);
  
  // ... render product
}
```

---

## Security Best Practices

1. **Never expose sensitive keys** in frontend code
2. **Use environment variables** for all secrets
3. **Implement rate limiting** on backend
4. **Validate all inputs** on backend
5. **Use HTTPS** in production
6. **Implement CORS** properly
7. **Hash passwords** with bcrypt
8. **Use JWT tokens** with expiration
9. **Implement refresh tokens** for long sessions
10. **Log security events** for monitoring

---

## Testing Backend Integration

```typescript
// __tests__/api.test.ts
import { getProducts, getProductById } from '@/lib/api/products';

describe('Products API', () => {
  it('should fetch all products', async () => {
    const products = await getProducts();
    expect(Array.isArray(products)).toBe(true);
  });
  
  it('should fetch product by ID', async () => {
    const product = await getProductById(1);
    expect(product.id).toBe(1);
  });
});
```

---

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Authentication tested
- [ ] API endpoints tested
- [ ] CORS configured
- [ ] SSL certificate installed
- [ ] Rate limiting enabled
- [ ] Logging configured
- [ ] Backups scheduled
- [ ] Monitoring set up

---

For more information, refer to the official documentation:
- Supabase: https://supabase.com/docs
- Firebase: https://firebase.google.com/docs
- Express: https://expressjs.com/
