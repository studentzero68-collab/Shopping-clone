function ProductCard({ product }) {
  const { title, price, image, rating } = product

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img src={image} alt={title} loading="lazy" />
      </div>

      <div className="product-body">
        <h3>{title}</h3>
        <p className="product-rating">
          {rating.rate} ★ <span>({rating.count})</span>
        </p>
        <p className="product-price">R {price.toFixed(2)}</p>
        <button type="button" className="add-btn">
          Add to cart
        </button>
      </div>
    </article>
  )
}

export default ProductCard
