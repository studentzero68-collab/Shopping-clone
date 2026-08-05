import { useMemo, useState } from "react";
import { useCart } from "../context/CartContext";
import {
  PAYMENT_METHODS,
  SOUTH_AFRICAN_PROVINCES,
  formatRand,
  getItemSubtotal,
  validateAddress,
  validatePayment,
} from "../context/cartHelpers";
import "./CartDrawer.css";

const emptyAddress = {
  fullName: "",
  phone: "",
  street: "",
  suburb: "",
  city: "",
  province: "",
  postalCode: "",
  country: "South Africa",
};

const emptyPayment = {
  method: "Credit Card",
  cardholderName: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
};

function FieldError({ message }) {
  return message ? <span className="cart-field-error">{message}</span> : null;
}

function CartItem({ item, onQuantityChange, onRemove }) {
  return (
    <article className="cart-item">
      <img className="cart-item-image" src={item.image} alt={item.name} />

      <div className="cart-item-copy">
        <p className="cart-item-category">{item.category}</p>
        <h2>{item.name}</h2>
        <p className="cart-item-stock">{item.stock} in stock</p>
      </div>

      <div className="cart-item-price">
        <span>Unit price</span>
        <strong>{formatRand(item.price)}</strong>
      </div>

      <div className="cart-quantity-controls">
        <button
          type="button"
          disabled={item.quantity === 1}
          onClick={() => onQuantityChange(item.id, item.quantity - 1)}
          aria-label={`Decrease quantity of ${item.name}`}
        >
          -
        </button>
        <span>{item.quantity}</span>
        <button
          type="button"
          disabled={item.quantity === item.stock}
          onClick={() => onQuantityChange(item.id, item.quantity + 1)}
          aria-label={`Increase quantity of ${item.name}`}
        >
          +
        </button>
      </div>

      <div className="cart-item-subtotal">
        <span>Subtotal</span>
        <strong>{formatRand(getItemSubtotal(item))}</strong>
      </div>

      <button type="button" className="cart-delete-button" onClick={() => onRemove(item)}>
        Delete
      </button>
    </article>
  );
}

function ExpandableSection({ label, title, isOpen, onToggle, children }) {
  return (
    <section className="cart-panel">
      <button type="button" className="cart-expand-button" onClick={onToggle}>
        <span>
          <small>{label}</small>
          <strong>{title}</strong>
        </span>
        <span className="cart-expand-icon">{isOpen ? "-" : "+"}</span>
      </button>

      {isOpen && <div className="cart-expand-content">{children}</div>}
    </section>
  );
}

function AddressForm({ address, errors, onChange }) {
  return (
    <div className="cart-form-grid">
      <label>
        Full Name
        <input value={address.fullName} onChange={(e) => onChange("fullName", e.target.value)} />
        <FieldError message={errors.fullName} />
      </label>

      <label>
        Phone Number
        <input value={address.phone} onChange={(e) => onChange("phone", e.target.value)} />
        <FieldError message={errors.phone} />
      </label>

      <label className="cart-form-wide">
        Street Address
        <input value={address.street} onChange={(e) => onChange("street", e.target.value)} />
        <FieldError message={errors.street} />
      </label>

      <label>
        Suburb
        <input value={address.suburb} onChange={(e) => onChange("suburb", e.target.value)} />
        <FieldError message={errors.suburb} />
      </label>

      <label>
        City
        <input value={address.city} onChange={(e) => onChange("city", e.target.value)} />
        <FieldError message={errors.city} />
      </label>

      <label>
        Province
        <select value={address.province} onChange={(e) => onChange("province", e.target.value)}>
          <option value="">Select province</option>
          {SOUTH_AFRICAN_PROVINCES.map((province) => (
            <option key={province} value={province}>{province}</option>
          ))}
        </select>
        <FieldError message={errors.province} />
      </label>

      <label>
        Postal Code
        <input value={address.postalCode} onChange={(e) => onChange("postalCode", e.target.value)} />
        <FieldError message={errors.postalCode} />
      </label>

      <label className="cart-form-wide">
        Country
        <input value={address.country} disabled readOnly />
      </label>
    </div>
  );
}

function PaymentForm({ payment, errors, onChange }) {
  const showCardFields = payment.method === "Credit Card" || payment.method === "Debit Card";

  return (
    <>
      <div className="cart-payment-methods">
        {PAYMENT_METHODS.map((method) => (
          <label key={method} className={payment.method === method ? "active" : ""}>
            <input
              type="radio"
              name="paymentMethod"
              value={method}
              checked={payment.method === method}
              onChange={(e) => onChange("method", e.target.value)}
            />
            {method}
          </label>
        ))}
      </div>

      {showCardFields ? (
        <div className="cart-form-grid">
          <label className="cart-form-wide">
            Cardholder Name
            <input value={payment.cardholderName} onChange={(e) => onChange("cardholderName", e.target.value)} />
            <FieldError message={errors.cardholderName} />
          </label>

          <label className="cart-form-wide">
            Card Number
            <input value={payment.cardNumber} onChange={(e) => onChange("cardNumber", e.target.value)} />
            <FieldError message={errors.cardNumber} />
          </label>

          <label>
            Expiry Date
            <input placeholder="MM/YY" value={payment.expiry} onChange={(e) => onChange("expiry", e.target.value)} />
            <FieldError message={errors.expiry} />
          </label>

          <label>
            CVV
            <input value={payment.cvv} onChange={(e) => onChange("cvv", e.target.value)} />
            <FieldError message={errors.cvv} />
          </label>
        </div>
      ) : (
        <p className="cart-placeholder-copy">{payment.method} is a placeholder for later backend checkout.</p>
      )}
    </>
  );
}

function CartSummary({ selectedPlan, totals }) {
  const selectedInstallment = selectedPlan === "six"
    ? `${formatRand(totals.sixMonthPayment)}/month`
    : `${formatRand(totals.twelveMonthPayment)}/month`;

  return (
    <aside className="cart-summary">
      <h2>Cart Summary</h2>
      <dl>
        <div>
          <dt>Items ({totals.itemCount})</dt>
          <dd>{formatRand(totals.subtotal)}</dd>
        </div>
        <div>
          <dt>Subtotal</dt>
          <dd>{formatRand(totals.subtotal)}</dd>
        </div>
        <div className="cart-discount-row">
          <dt>New Customer Discount</dt>
          <dd>-{formatRand(totals.discount)}</dd>
        </div>
        <div>
          <dt>Delivery</dt>
          <dd>{formatRand(totals.delivery)}</dd>
        </div>
        <div>
          <dt>VAT</dt>
          <dd>{formatRand(totals.vat)}</dd>
        </div>
        <div className="cart-total-row">
          <dt>Total</dt>
          <dd>{formatRand(totals.total)}</dd>
        </div>
        {selectedPlan !== "once" && (
          <div>
            <dt>Installment</dt>
            <dd>{selectedInstallment}</dd>
          </div>
        )}
      </dl>
    </aside>
  );
}

function PaymentOptions({ selectedPlan, setSelectedPlan, totals }) {
  return (
    <section className="cart-summary">
      <h2>Payment Options</h2>
      <div className="cart-installments">
        <label className={selectedPlan === "once" ? "active" : ""}>
          <input type="radio" name="paymentPlan" checked={selectedPlan === "once"} onChange={() => setSelectedPlan("once")} />
          <span>Pay Once</span>
          <strong>{formatRand(totals.total)}</strong>
        </label>
        <label className={selectedPlan === "six" ? "active" : ""}>
          <input type="radio" name="paymentPlan" checked={selectedPlan === "six"} onChange={() => setSelectedPlan("six")} />
          <span>6 Month Installment</span>
          <strong>{formatRand(totals.sixMonthPayment)}/month</strong>
        </label>
        <label className={selectedPlan === "twelve" ? "active" : ""}>
          <input type="radio" name="paymentPlan" checked={selectedPlan === "twelve"} onChange={() => setSelectedPlan("twelve")} />
          <span>12 Month Installment</span>
          <strong>{formatRand(totals.twelveMonthPayment)}/month</strong>
        </label>
      </div>
    </section>
  );
}

export default function CartDrawer() {
  const { items, status, feedback, totals, setQuantity, removeFromCart } = useCart();
  const [address, setAddress] = useState(emptyAddress);
  const [payment, setPayment] = useState(emptyPayment);
  const [touchedAddress, setTouchedAddress] = useState({});
  const [touchedPayment, setTouchedPayment] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [isDeliveryOpen, setIsDeliveryOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("once");

  const addressErrors = useMemo(() => validateAddress(address), [address]);
  const paymentErrors = useMemo(() => validatePayment(payment), [payment]);

  const visibleAddressErrors = getVisibleErrors(addressErrors, touchedAddress, hasSubmitted);
  const visiblePaymentErrors = getVisibleErrors(paymentErrors, touchedPayment, hasSubmitted);

  function updateAddress(field, value) {
    setAddress({ ...address, [field]: value });
    setTouchedAddress({ ...touchedAddress, [field]: true });
  }

  function updatePayment(field, value) {
    setPayment({ ...payment, [field]: value });
    setTouchedPayment({ ...touchedPayment, [field]: true });
  }

  function deleteItem(item) {
    if (window.confirm(`Remove ${item.name} from your cart?`)) {
      removeFromCart(item.id);
    }
  }

  function validateCart(event) {
    event.preventDefault();
    setHasSubmitted(true);
  }

  return (
    <main className="cart-page">
      <div className="cart-page-header">
        <div>
          <p>Shopping Cart</p>
          <h1>Checkout</h1>
        </div>
        <div className="cart-total-pill">{formatRand(totals.total)}</div>
      </div>

      {feedback && <div className="cart-feedback">{feedback}</div>}

      <form className="cart-layout" onSubmit={validateCart}>
        <div className="cart-main-column">
          <section className="cart-panel">
            <div className="cart-section-heading">
              <p>Basket</p>
              <h2>Cart Items</h2>
            </div>

            {status === "loading" ? (
              <div className="cart-loading"><span /><span /><span /></div>
            ) : items.length === 0 ? (
              <div className="cart-empty-state">
                <h2>Your cart is empty.</h2>
                <p>Balance is {formatRand(0)}. You can still test delivery and payment details.</p>
              </div>
            ) : (
              <div className="cart-items-list">
                {items.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onQuantityChange={setQuantity}
                    onRemove={deleteItem}
                  />
                ))}
              </div>
            )}
          </section>

          <ExpandableSection
            label="Delivery"
            title="South African Address"
            isOpen={isDeliveryOpen}
            onToggle={() => setIsDeliveryOpen(!isDeliveryOpen)}
          >
            <AddressForm address={address} errors={visibleAddressErrors} onChange={updateAddress} />
          </ExpandableSection>

          <ExpandableSection
            label="Payment"
            title="Payment Method"
            isOpen={isPaymentOpen}
            onToggle={() => setIsPaymentOpen(!isPaymentOpen)}
          >
            <PaymentForm payment={payment} errors={visiblePaymentErrors} onChange={updatePayment} />
          </ExpandableSection>
        </div>

        <div className="cart-side-column">
          <CartSummary selectedPlan={selectedPlan} totals={totals} />
          <PaymentOptions selectedPlan={selectedPlan} setSelectedPlan={setSelectedPlan} totals={totals} />
          <button type="submit" className="cart-checkout-button">Validate Cart</button>
        </div>
      </form>
    </main>
  );
}

function getVisibleErrors(errors, touchedFields, hasSubmitted) {
  return Object.fromEntries(
    Object.entries(errors).filter(([field]) => hasSubmitted || touchedFields[field])
  );
}
