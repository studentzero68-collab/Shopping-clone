import { useCart } from "../context/CartContext";

function ProductCard({ product }) {
  const {
    title,
    price,
    thumbnail,
    rating,
    brand,
    stock,
    discountPercentage,
  } = product;

  const { addToCart } = useCart();

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img
          src={thumbnail}
          alt={title}
          loading="lazy"
        />
      </div>

      <div className="product-body">
        <h3>{title}</h3>

        <p className="product-brand">
          <strong>Brand:</strong> {brand}
        </p>

        <p className="product-rating">
          ⭐ {rating}
        </p>

        <p className="product-stock">
          Stock: {stock}
        </p>

        <p className="product-discount">
          {discountPercentage}% OFF
        </p>

        <p className="product-price">
          R {price.toFixed(2)}
        </p>

        <button
          type="button"
          className="add-btn"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
}

export default ProductCard;