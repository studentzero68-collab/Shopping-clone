import { useCart } from "../context/CartContext";

function Cart() {
  const {
    cartItems,
    cartCount,
    cartTotal,
    removeFromCart,
    clearCart,
  } = useCart();

  return (
    <main className="app-main">
      <h1>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <article key={item.id} className="product-card">
              <h3>{item.title}</h3>

              <p>Quantity: {item.quantity}</p>

              <p>Price: R {item.price.toFixed(2)}</p>

              <button onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </article>
          ))}

          <hr />

          <h3>Total Items: {cartCount}</h3>

          <h2>Total: R {cartTotal.toFixed(2)}</h2>

          <button onClick={clearCart}>
            Clear Cart
          </button>
        </>
      )}
    </main>
  );
}

export default Cart;