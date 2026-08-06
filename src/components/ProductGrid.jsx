import ProductCard from "./ProductCard";
import { useProducts } from "../context/ProductsContext";

function ProductGrid() {
  const { paginatedProducts, filteredProducts, status, error } = useProducts();

  if (status === "loading") {
    return <p className="product-grid-status">Loading products...</p>;
  }

  if (status === "error") {
    return <p className="product-grid-status">Couldn't load products: {error}</p>;
  }

  if (status === "success" && filteredProducts.length === 0) {
    return <p className="product-grid-status">No products match your search.</p>;
  }

  return (
    <section className="product-grid" aria-label="Products">
      {paginatedProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
}

export default ProductGrid;