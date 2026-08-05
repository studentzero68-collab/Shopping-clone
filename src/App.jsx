import Navbar from "./components/Navbar";
import ProductGrid from "./components/ProductGrid";
import useTheme from "./hooks/useTheme";
import { useProducts } from "./context/ProductsContext";
import "./App.css";

function OnlineMall() {
  const { theme, toggleTheme } = useTheme();

  const { setSearchTerm, setActiveCategory } = useProducts();

  function handleSearch(query) {
    setSearchTerm(query);
  }

  function handleCategorySelect(category) {
    setActiveCategory(category);
  }

  return (
    <>
      <Navbar
        cartCount={0}
        theme={theme}
        onThemeToggle={toggleTheme}
        onSearch={handleSearch}
        onCategorySelect={handleCategorySelect}
      />

      <main className="app-main">
        <h1>Online Mall</h1>

        <ProductGrid />
      </main>
    </>
  );
}

export default OnlineMall;