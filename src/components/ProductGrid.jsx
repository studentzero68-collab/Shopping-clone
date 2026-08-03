import ProductCard from './ProductCard'

function ProductGrid({ products }) {
  return (
    <section className="product-grid" aria-label="Products">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  )
}

export default ProductGrid
