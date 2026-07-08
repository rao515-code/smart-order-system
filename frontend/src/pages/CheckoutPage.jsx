function CheckoutPage({
  checkoutForm,
  handleCheckoutChange,
  placeOrder,
  cart,
  cartTotal,
}) {
  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Checkout</h1>
          <p>Enter customer and shipping details.</p>
        </div>
      </div>

      <div className="checkout-layout">
        <form className="form-card" onSubmit={placeOrder}>
          <div className="form-group">
            <label>Customer Name</label>
            <input
              type="text"
              name="customerName"
              value={checkoutForm.customerName}
              onChange={handleCheckoutChange}
              placeholder="Enter customer name"
              required
            />
          </div>

          <div className="form-group">
            <label>Shipping Address</label>
            <input
              type="text"
              name="shippingAddress"
              value={checkoutForm.shippingAddress}
              onChange={handleCheckoutChange}
              placeholder="Street address"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>City</label>
              <input
                type="text"
                name="city"
                value={checkoutForm.city}
                onChange={handleCheckoutChange}
                required
              />
            </div>

            <div className="form-group">
              <label>State</label>
              <input
                type="text"
                name="state"
                value={checkoutForm.state}
                onChange={handleCheckoutChange}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Zip Code</label>
            <input
              type="text"
              name="zipCode"
              value={checkoutForm.zipCode}
              onChange={handleCheckoutChange}
              required
            />
          </div>

          <button className="primary-button" type="submit">
            Place Order
          </button>
        </form>

        <div className="summary-card">
          <h2>Order Summary</h2>

          {cart.map((item) => (
            <div className="summary-row" key={item.id}>
              <span>
                {item.name} x {item.quantity}
              </span>
              <strong>${item.price * item.quantity}</strong>
            </div>
          ))}

          <hr />

          <div className="summary-row total">
            <span>Total</span>
            <strong>${cartTotal.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CheckoutPage;