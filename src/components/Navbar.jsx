import { useProducts } from "../context/ProductsContext";
import "./Navbar.css";

const CATEGORIES = [
  "Men",
  "Women",
  "Kids",
  "Tech",
  "Tools",
  "Household Appliances",
  "Furniture",
];

export default function Navbar({
  cartCount = 0,
  theme = "light",
  onThemeToggle,
}) {
  const {
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
  } = useProducts();

  return (
    <header className="navbar">
      <div className="navbar-top">
        <a href="/" className="navbar-logo">
          Online<span>Mall</span>
        </a>

        <form
          className="navbar-search"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search products"
          />

          <button type="submit" aria-label="Search">
            🔍
          </button>
        </form>

        <button
          type="button"
          className="navbar-theme-toggle"
          onClick={onThemeToggle}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>

        <a href="/cart" className="navbar-cart">
          🛒

          {cartCount > 0 && (
            <span className="navbar-cart-badge">
              {cartCount}
            </span>
          )}
        </a>
      </div>

      <nav className="navbar-categories">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            className={
              activeCategory === category
                ? "navbar-category active"
                : "navbar-category"
            }
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </nav>
    </header>
  );
}