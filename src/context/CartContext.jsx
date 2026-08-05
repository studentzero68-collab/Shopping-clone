import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { calculateCartTotals, loadCartProducts } from "./cartHelpers";

const CartContext = createContext(null);

function prepareCartItem(product) {
  return {
    id: product.id,
    name: product.name ?? product.title,
    title: product.title ?? product.name,
    image: product.image,
    price: Number(product.price) || 0,
    quantity: Math.max(1, Number(product.quantity) || 1),
    stock: Number(product.stock) || 20,
    category: product.category ?? "General",
  };
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("idle");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    async function getCartItems() {
      setStatus("loading");
      const products = await loadCartProducts();
      setItems(products.map(prepareCartItem));
      setStatus("success");
    }

    getCartItems().catch(() => {
      setItems([]);
      setStatus("error");
    });
  }, []);

  function showFeedback(message) {
    setFeedback(message);
    window.setTimeout(() => setFeedback(""), 1400);
  }

  const setQuantity = useCallback((productId, quantity) => {
    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== productId) return item;

        const safeQuantity = Math.max(1, Math.min(quantity, item.stock));
        return { ...item, quantity: safeQuantity };
      })
    );
    showFeedback("Cart updated");
  }, []);

  const addToCart = useCallback((product) => {
    const newItem = prepareCartItem(product);

    setItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === newItem.id);
      if (!existingItem) return [...currentItems, newItem];

      return currentItems.map((item) =>
        item.id === newItem.id
          ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) }
          : item
      );
    });

    showFeedback("Added to cart");
  }, []);

  const removeFromCart = useCallback((productId) => {
    setItems((currentItems) => currentItems.filter((item) => item.id !== productId));
    showFeedback("Item removed");
  }, []);

  const totals = useMemo(() => calculateCartTotals(items), [items]);

  const value = useMemo(
    () => ({
      items,
      status,
      feedback,
      totals,
      cartCount: totals.itemCount,
      cartTotal: totals.total,
      addToCart,
      setQuantity,
      removeFromCart,
    }),
    [items, status, feedback, totals, addToCart, setQuantity, removeFromCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const cart = useContext(CartContext);
  if (!cart) throw new Error("useCart must be used inside CartProvider");
  return cart;
}
