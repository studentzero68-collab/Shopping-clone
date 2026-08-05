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
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      setStatus("loading");
      setError(null);

      try {
        const response = await fetch(API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Request failed with ${response.status}`);
        }

        const data = await response.json();

        setProducts(data);
        setStatus("success");
      } catch (err) {
        if (err.name === "AbortError") return;

        setError(err.message || "Something went wrong.");
        setStatus("error");
      }
    }

    fetchProducts();

    return () => controller.abort();
  }, []);

  const categories = useMemo(() => {
    return [...new Set(products.map((product) => product.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory = activeCategory
        ? product.category === activeCategory
        : true;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, activeCategory]);

  const value = useMemo(
    () => ({
      products,
      filteredProducts,
      categories,
      status,
      error,
      searchTerm,
      activeCategory,
      setSearchTerm,
      setActiveCategory,
    }),
    [
      products,
      filteredProducts,
      categories,
      status,
      error,
      searchTerm,
      activeCategory,
    ]
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error("useProducts must be used inside ProductsProvider");
  }

  return context;
}