import { useProducts } from "../context/ProductsContext";
import "./Hero.css";

function Hero() {
  const { searchTerm, setSearchTerm } = useProducts();

  return (
    <section className="hero">
      <div className="hero-inner">
        <p className="hero-eyebrow">Online Mall</p>
        <h1>Everything you need, one cart away.</h1>
        <p className="hero-subtitle">
          Browse electronics, fashion, and more — all in one place.
        </p>

        <form className="hero-search" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            aria-label="Search products"
          />

          <button type="submit" aria-label="Search">
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <circle
                cx="11"
                cy="11"
                r="7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <line
                x1="21"
                y1="21"
                x2="16.65"
                y2="16.65"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            Search
          </button>
        </form>
      </div>
    </section>
  );
}

export default Hero;
