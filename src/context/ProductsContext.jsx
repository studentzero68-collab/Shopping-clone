import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const ProductsContext = createContext(null);

const API_URL = "https://fakestoreapi.com/products";

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      setStatus("loading");
      setError(null);
      try {
        const res = await fetch(API_URL, { signal: controller.signal });
        if (!res.ok) throw new Error(`Request failed with ${res.status}`);
        const data = await res.json();
        setProducts(data);
        setStatus("success");
      } catch (err) {
        if (err.name === "AbortError") return;
        setError(err.message || "Something went wrong fetching products.");
        setStatus("error");
      }
    }

    fetchProducts();
    return () => controller.abort();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = searchTerm
        ? product.title.toLowerCase().includes(searchTerm.toLowerCase())
        : true;

      const matchesCategory = activeCategory
        ? product.category.toLowerCase() === activeCategory.toLowerCase()
        : true;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, activeCategory]);

  const value = useMemo(
    () => ({
      products,
      filteredProducts,
      status,
      error,
      searchTerm,
      activeCategory,
      setSearchTerm,
      setActiveCategory,
    }),
    [products, filteredProducts, status, error, searchTerm, activeCategory]
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) {
    throw new Error("useProducts must be used inside a <ProductsProvider>");
  }
  return ctx;
}
