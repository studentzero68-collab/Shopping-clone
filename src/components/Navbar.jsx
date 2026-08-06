import { Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ cartCount = 0, theme = "light", onThemeToggle }) {
  return (
    <header className="navbar">
      <div className="navbar-top">
        <Link to="/" className="navbar-logo">
          Online<span>Mall</span>
        </Link>

        <button
          type="button"
          className="navbar-theme-toggle"
          onClick={onThemeToggle}
          aria-label={
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
          }
        >
          {theme === "dark" ? (
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <circle cx="12" cy="12" r="5" fill="currentColor" />
              <g stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="12" y1="1" x2="12" y2="3" />
                <line x1="12" y1="21" x2="12" y2="23" />
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                <line x1="1" y1="12" x2="3" y2="12" />
                <line x1="21" y1="12" x2="23" y2="12" />
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
              </g>
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
              <path
                d="M21 14.5A8.5 8.5 0 0 1 9.5 3a6.5 6.5 0 1 0 11.5 11.5Z"
                fill="currentColor"
              />
            </svg>
          )}
        </button>

        <Link to="/cart" className="navbar-cart" aria-label={`Cart, ${cartCount} items`}>
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
        </Link>
      </div>
    </header>
  );
}
