# RICHIE GADGETS

**Technology, thoughtfully selected.**

Premium electronics e-commerce website — portfolio demonstration project.

## Features

- Premium dark technology aesthetic
- 70+ products across smartphones, gaming, computers, audio, wearables, cameras
- Advanced shop filters (brand, price, storage, platform, availability, sort)
- Product detail pages, search, cart drawer, wishlist
- Demo checkout with order confirmation
- Centralized product image registry
- Toast notifications, loading skeletons, empty states
- Admin dashboard structure (`/admin`)
- Supabase-ready schema (products, categories, users, orders, wishlist)
- Fully responsive

## Tech Stack

- **Next.js 16** (App Router) + TypeScript
- **Tailwind CSS v4** + Geist font
- **Zustand** (cart + wishlist, localStorage)
- **Supabase** (optional — schema included)
- **Sonner** (toasts)
- **Lucide React** (icons)

## Getting Started

```bash
npm install
cp .env.example .env.local   # optional, for Supabase
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Supabase Setup (optional)

1. Create a project at [supabase.com](https://supabase.com)
2. Run the SQL in `supabase-schema.sql` in the SQL Editor
3. Copy project URL + anon key into `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

4. Restart the dev server

Without Supabase the app uses the local product catalog (`src/data/products.ts`) and localStorage for cart/wishlist.

## Image Registry

All product images are managed in `src/data/images.ts`.

- Official Apple / Samsung / PlayStation / Nintendo CDNs used where reliable
- Clean placeholders (`placehold.co`) for other brands
- Update URLs in one place — components call `getProductImage(id)`

## Admin

Visit `/admin` for the demo dashboard and product list.

Full CRUD (add/edit/delete products, stock, orders) is structured for Supabase. Connect Supabase + create an admin profile (`role = 'admin'`) to enable write operations.

## Project Structure

```
src/
├── app/                 # Routes (shop, products, cart, checkout, admin…)
├── components/          # UI (Header, CartDrawer, ProductCard, ShopFilters…)
├── data/                # Local catalog + image registry
├── lib/                 # utils, filters, supabase client
├── store/               # Zustand cart/wishlist
└── types/               # TypeScript types
supabase-schema.sql      # Full database schema + RLS
```

## Environment Variables

See `.env.example`. Never commit real keys.

## Deployment (Vercel)

1. Push to GitHub
2. Import the repo in Vercel
3. Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` if using Supabase
4. Deploy

## Demo Notice

This is a portfolio demonstration website.

- No real payments are processed
- Delivery, returns, and warranty info are illustrative
- Business contact details are placeholders

## License

Private portfolio project.
