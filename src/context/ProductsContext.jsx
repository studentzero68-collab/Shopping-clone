import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const ProductsContext = createContext(null);

const API_URL = "https://dummyjson.com/products?limit=100";

const FALLBACK_PRODUCTS = [
  {
    id: 1,
    title: "Wireless Headphones",
    category: "Electronics",
    price: 899,
    thumbnail: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    brand: "AudioPro",
    rating: 4.7,
    stock: 12,
    discountPercentage: 15,
  },
  {
    id: 2,
    title: "Leather Backpack",
    category: "Fashion",
    price: 650,
    thumbnail: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
    brand: "Northstar",
    rating: 4.4,
    stock: 8,
    discountPercentage: 10,
  },
  {
    id: 3,
    title: "Smart Watch",
    category: "Electronics",
    price: 1299,
    thumbnail: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    brand: "TimeTech",
    rating: 4.8,
    stock: 5,
    discountPercentage: 20,
  },
  {
    id: 4,
    title: "Running Shoes",
    category: "Sports",
    price: 999,
    thumbnail: "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80",
    brand: "SprintX",
    rating: 4.5,
    stock: 6,
    discountPercentage: 12,
  },
];

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

        setProducts(data.products?.length ? data.products : FALLBACK_PRODUCTS);
        setStatus("success");
      } catch (err) {
        if (err.name === "AbortError") return;

        setProducts(FALLBACK_PRODUCTS);
        setError(err.message || "Something went wrong.");
        setStatus("success");
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

  const value = {
    products,
    filteredProducts,
    categories,
    status,
    error,
    searchTerm,
    activeCategory,
    setSearchTerm,
    setActiveCategory,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error("useProducts must be used inside a ProductsProvider");
  }

  return context;
}