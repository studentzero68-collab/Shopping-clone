import { useState } from "react";
import "./Navbar.css";

// Category list — your group can extend this or wire it to real routing/filtering later
const CATEGORIES = [
  "Men",
  "Women",
  "Kids",
  "Tech",
  "Tools",
  "Household Appliances",
  "Furniture",
];

export default function Navbar({ cartCount = 0, onSearch, onCategorySelect }) {
  const [searchValue, setSearchValue] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);

  function handleSearchSubmit(e) {
    e.preventDefault();
    const trimmed = searchValue.trim();
    if (trimmed && onSearch) onSearch(trimmed);
  }

  function handleCategoryClick(category) {
    setActiveCategory(category);
    if (onCategorySelect) onCategorySelect(category);
  }

  return (
    <header className="navbar">
      <div className="navbar-top">
        <a href="/" className="navbar-logo">
          Shop<span>Center</span>
        </a>

        <form className="navbar-search" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            aria-label="Search products"
          />
          <button type="submit" aria-label="Search">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <circle cx="11" cy="11" r="7" fill="none" stroke="currentColor" strokeWidth="2" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </form>

        <a href="/cart" className="navbar-cart" aria-label={`Cart, ${cartCount} items`}>
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
            <circle cx="9" cy="21" r="1.5" fill="currentColor" />
            <circle cx="18" cy="21" r="1.5" fill="currentColor" />
            <path
              d="M2 3h2l2.4 12.2a2 2 0 0 0 2 1.8h8.2a2 2 0 0 0 2-1.6L21 8H6"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {cartCount > 0 && <span className="navbar-cart-badge">{cartCount}</span>}
        </a>
      </div>

      <nav className="navbar-categories" aria-label="Product categories">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            type="button"
            className={`navbar-category${activeCategory === category ? " active" : ""}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </nav>
    </header>
  );
}
