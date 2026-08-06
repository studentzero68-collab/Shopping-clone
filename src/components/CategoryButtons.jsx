import { useProducts } from "../context/ProductsContext";
import "./CategoryButtons.css";

function CategoryButtons() {
  const { categories, activeCategory, setActiveCategory } = useProducts();

  function handleCategoryClick(category) {
    // Clicking the already-selected category again clears the filter.
    setActiveCategory(activeCategory === category ? null : category);
  }

  return (
    <nav className="category-buttons" aria-label="Product categories">
      <button
        type="button"
        className={`category-button${activeCategory === null ? " active" : ""}`}
        onClick={() => handleCategoryClick(null)}
      >
        All
      </button>

      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={`category-button${activeCategory === category ? " active" : ""}`}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </button>
      ))}
    </nav>
  );
}

export default CategoryButtons;
