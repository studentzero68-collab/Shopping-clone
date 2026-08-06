# Online Mall

A React shopping app built for the Zaio Term 3 / Week 16 assignment: **Context API for shared state across multiple components**.

Live demo, repo, docs, and Loom links are in the [Deliverables](#deliverables) section below.

## What's included

- **Vite + React 19 + React Router** setup
- **Two React Context providers** (`ProductsContext`, `CartContext`) sharing state across `Navbar`, `Hero`, `CategoryButtons`, `ProductGrid`, `ProductCard`, `Pagination`, and `CartDrawer` — see [`docs/state-management.md`](./docs/state-management.md) for the full state shape, a diagram, and the justification for Context over Redux
- **Live product catalog** fetched from [DummyJSON](https://dummyjson.com/products), with a small hard-coded fallback list if the request fails
- **Search, category filtering, and pagination** over the catalog
- **A full cart / checkout flow**: quantity controls, delivery address form, payment method form, installment plan selection (once / 6 months / 12 months), South African VAT + delivery calculation, and cart totals
- **Light/dark theme toggle** persisted via a `useTheme` hook
- **Responsive layout** down to mobile widths

## Page structure

```
Navbar          — logo, theme toggle, cart icon (global, all pages)
Hero            — banner + product search            (home page)
Category Buttons — filter by category                (home page)
Products        — product grid                       (home page)
Pagination      — page controls for the product grid  (home page)
Footer          — site footer                         (home page)
```

The cart page (`/cart`) reuses the same `Navbar` and renders the checkout flow (`CartDrawer`).

## Project structure

```
src/
  components/     Navbar, Hero, CategoryButtons, ProductGrid, ProductCard,
                   Pagination, Footer, cartDrawer (checkout UI)
  context/        ProductsContext, CartContext, cartHelpers (pricing/validation)
  hooks/          useTheme
  pages/          Home
  App.jsx         routes + top-level layout
  main.jsx        providers + router entry point
docs/
  state-management.md   state shape, diagram, and Context vs Redux justification
```

## State management

State is shared via two React Context providers rather than Redux — see [`docs/state-management.md`](./docs/state-management.md) for the reasoning, the full state shape for each context, a diagram of the data flow, and a table of which components read/write each piece of state.

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown in your terminal (usually `http://localhost:5173`).

## Build & deploy

```bash
npm run build     # outputs to dist/
npm run deploy     # publishes dist/ to GitHub Pages via gh-pages
```

This project is configured to deploy under a subpath (`base: '/Shopping-clone/'` in `vite.config.js`), and the router uses `basename={import.meta.env.BASE_URL}` so it works correctly on GitHub Pages. All in-app navigation (logo, cart icon) uses React Router's `<Link>` rather than plain `<a href="/...">` tags — plain anchor tags reload the page at the domain root instead of the `/Shopping-clone/` subpath, which is what caused the GitHub 404 page when clicking the logo from `/cart` on the deployed site.

## Deliverables

- Deployed app: _add your GitHub Pages URL here_
- GitHub repo: _add your repo URL here_
- State management docs: [`docs/state-management.md`](./docs/state-management.md)
- Loom walkthrough: _add your Loom link here_
