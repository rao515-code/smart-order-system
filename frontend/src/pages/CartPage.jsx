function CartPage({
  cart,
  cartTotal,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  setActivePage,
}) {
  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Cart</h1>
          <p>Review selected products before checkout.</p>
        </div>
      </div>

      {cart.length === 0 ? (
        <div className="empty-state">
          <h2>Your cart is empty</h2>
          <p>Add products to continue checkout.</p>

          <button className="primary-button" onClick={() => setActivePage("products")}>
            Go to Products
          </button>
        </div>
      ) : (
        <div className="panel">
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <div>
                <h3>
                  {item.image} {item.name}
                </h3>
                <p>${item.price} each</p>
              </div>

              <div className="quantity-actions">
                <button onClick={() => decreaseQuantity(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => increaseQuantity(item.id)}>+</button>
              </div>

              <strong>${item.price * item.quantity}</strong>

              <button className="danger-button" onClick={() => removeFromCart(item.id)}>
                Remove
              </button>
            </div>
          ))}

          <div className="cart-total">
            <h2>Total: ${cartTotal.toFixed(2)}</h2>

            <button className="primary-button" onClick={() => setActivePage("checkout")}>
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default CartPage;