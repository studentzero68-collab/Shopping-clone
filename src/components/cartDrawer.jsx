import { useCart } from "../context/CartContext";
import "./CartDrawer.css";

function CartDrawer({ open, onClose }) {
  const { items, cartTotal, setQuantity, removeFromCart, clearCart } = useCart();

  if (!open) return null;

  return (
    <div className="cart-drawer-backdrop" onClick={onClose}>
      <aside
        id="cart"
        className="cart-drawer"
        onClick={(e) => e.stopPropagation()}
        aria-label="Shopping cart"
      >
        <div className="cart-drawer-header">
          <h2>Your Cart</h2>
          <button type="button" className="cart-drawer-close" onClick={onClose} aria-label="Close cart">
            &times;
          </button>
        </div>

        {items.length === 0 ? (
          <p className="cart-drawer-empty">Your cart is empty.</p>
        ) : (
          <>
            <ul className="cart-drawer-list">
              {items.map((item) => (
                <li key={item.id} className="cart-drawer-item">
                  <img src={item.image} alt={item.title} />
                  <div className="cart-drawer-item-info">
                    <p className="cart-drawer-item-title">{item.title}</p>
                    <p className="cart-drawer-item-price">R {item.price.toFixed(2)}</p>
                    <div className="cart-drawer-qty">
                      <button
                        type="button"
                        onClick={() => setQuantity(item.id, item.quantity - 1)}
                        aria-label={`Decrease quantity of ${item.title}`}
                      >
                        −
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(item.id, item.quantity + 1)}
                        aria-label={`Increase quantity of ${item.title}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="cart-drawer-remove"
                    onClick={() => removeFromCart(item.id)}
                    aria-label={`Remove ${item.title} from cart`}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

            <div className="cart-drawer-footer">
              <p className="cart-drawer-total">Total: R {cartTotal.toFixed(2)}</p>
              <button type="button" className="cart-drawer-clear" onClick={clearCart}>
                Clear cart
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export default CartDrawer;