function Header({ cartCount = 0 }) {
  return (
    <header className="header">
      <div className="header-inner">
        <a href="/" className="logo">
          OnlineMall
        </a>

        <label className="search-bar">
          <span className="sr-only">Search products</span>
          <input type="search" placeholder="Search products..." disabled />
        </label>

        <button type="button" className="cart-btn" aria-label="Shopping cart">
          Cart
          <span className="cart-count">{cartCount}</span>
        </button>
      </div>
    </header>
  )
}

export default Header
