import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import CartDrawer from "./components/cartDrawer";
import { useCart } from "./context/CartContext";
import useTheme from "./hooks/useTheme";
import "./App.css";

function OnlineMall() {
  const { cartCount } = useCart();
  const { theme, toggleTheme } = useTheme();
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const isCartPage = currentPath === "/cart";

  useEffect(() => {
    function handlePopState() {
      setCurrentPath(window.location.pathname);
    }

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  function handleSearch(query) {
    console.log("Search submitted:", query);

    // Your group will wire this up to actually filter products later
    }
    
    function handleCategorySelect(category) {
      console.log("Category selected:", category);

      // Your group will wire this up to filter the product grid later
      }

      function handleCartNavigation(e) {
        e.preventDefault();
        window.history.pushState({}, "", "/cart");
        setCurrentPath("/cart");
      }
      
      return (
      <>
      <Navbar
      cartCount={cartCount}
      theme={theme}
      onThemeToggle={toggleTheme}
      onSearch={handleSearch}
      onCategorySelect={handleCategorySelect}
      onCartClick={handleCartNavigation}
      />
      
      {isCartPage ? (
        <CartDrawer />
      ) : (
        <main className="app-main">
          <h1>Online Mall</h1>
          <p>Product grid goes here next.</p>
        </main>
      )}
    </>
  );
}

export default OnlineMall;
