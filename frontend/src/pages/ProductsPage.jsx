function ProductsPage({ products, addToCart, totalCartItems, setActivePage }) {
  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Products</h1>
          <p>Browse products and add items to cart.</p>
        </div>

        <button className="secondary-button" onClick={() => setActivePage("cart")}>
          View Cart ({totalCartItems})
        </button>
      </div>

      <div className="product-grid">
        {products.map((product) => (
          <div className="product-card" key={product.id}>
            <div className="product-image">{product.image}</div>
            <h3>{product.name}</h3>
            <p>{product.category}</p>

            <div className="product-meta">
              <span>${product.price}</span>
              <span>Stock: {product.stock}</span>
            </div>

            <button className="primary-button" onClick={() => addToCart(product)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductsPage;