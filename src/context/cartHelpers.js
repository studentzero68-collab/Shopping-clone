export const SOUTH_AFRICAN_PROVINCES = [
  "Gauteng",
  "Western Cape",
  "Eastern Cape",
  "KwaZulu-Natal",
  "Free State",
  "Limpopo",
  "Mpumalanga",
  "North West",
  "Northern Cape",
];

export const PAYMENT_METHODS = [
  "Credit Card",
  "Debit Card",
  "EFT",
  "PayFast",
  "Ozow",
];

const NEW_CUSTOMER_DISCOUNT_RATE = 0.2;
const VAT_RATE = 0.15;
const FREE_DELIVERY_THRESHOLD = 1500;
const STANDARD_DELIVERY_FEE = 99;

const randFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export function formatRand(amount) {
  return `R${randFormatter.format(Number.isFinite(amount) ? amount : 0)}`;
}

export function roundMoney(amount) {
  return Math.round((amount + Number.EPSILON) * 100) / 100;
}

export function getItemSubtotal(item) {
  return roundMoney(item.price * item.quantity);
}

export function calculateCartTotals(items) {
  const subtotal = roundMoney(items.reduce((total, item) => total + getItemSubtotal(item), 0));
  const discount = roundMoney(subtotal * NEW_CUSTOMER_DISCOUNT_RATE);
  const discountedSubtotal = roundMoney(subtotal - discount);
  const delivery = discountedSubtotal > 0 && discountedSubtotal < FREE_DELIVERY_THRESHOLD
    ? STANDARD_DELIVERY_FEE
    : 0;
  const vat = roundMoney(discountedSubtotal * VAT_RATE);
  const total = roundMoney(discountedSubtotal + delivery + vat);

  return {
    itemCount: items.reduce((count, item) => count + item.quantity, 0),
    subtotal,
    discount,
    delivery,
    vat,
    total,
    sixMonthPayment: roundMoney(total / 6),
    twelveMonthPayment: roundMoney(total / 12),
  };
}

export async function loadCartProducts() {
  // TODO: Replace this with fetch("/api/products") when the products API is ready.
  return [];
}

export function validateAddress(address) {
  const errors = {};
  const phone = address.phone.replace(/\s+/g, "");

  ["fullName", "phone", "street", "suburb", "city", "province", "postalCode"].forEach((field) => {
    if (!address[field]?.trim()) errors[field] = "Required";
  });

  if (address.phone && !/^(\+27|0)[6-8][0-9]{8}$/.test(phone)) {
    errors.phone = "Enter a valid SA phone number";
  }

  if (address.postalCode && !/^[0-9]{4}$/.test(address.postalCode.trim())) {
    errors.postalCode = "Use a 4 digit SA postal code";
  }

  if (address.province && !SOUTH_AFRICAN_PROVINCES.includes(address.province)) {
    errors.province = "Select a South African province";
  }

  return errors;
}

export function validatePayment(payment) {
  const errors = {};
  const isCard = payment.method === "Credit Card" || payment.method === "Debit Card";

  if (!payment.method) errors.method = "Choose a payment method";
  if (!isCard) return errors;

  const cardNumber = payment.cardNumber.replace(/\s+/g, "");
  if (!payment.cardholderName.trim()) errors.cardholderName = "Required";
  if (!/^[0-9]{13,19}$/.test(cardNumber)) errors.cardNumber = "Card number must be 13 to 19 digits";
  if (!isValidExpiry(payment.expiry.trim())) errors.expiry = "Use MM/YY and a future date";
  if (!/^[0-9]{3,4}$/.test(payment.cvv.trim())) errors.cvv = "CVV must be 3 or 4 digits";

  return errors;
}

function isValidExpiry(value) {
  const match = value.match(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/);
  if (!match) return false;

  const month = Number(match[1]);
  const year = 2000 + Number(match[2]);
  return new Date(year, month, 0) >= new Date();
}
