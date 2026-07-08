function PaymentPage({
  selectedOrder,
  paymentForm,
  handlePaymentChange,
  processPayment,
  setActivePage,
}) {
  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Payment</h1>
          <p>Process mock payment for the selected order.</p>
        </div>
      </div>

      {!selectedOrder ? (
        <div className="empty-state">
          <h2>No order selected</h2>
          <p>Please checkout first before making payment.</p>

          <button className="primary-button" onClick={() => setActivePage("cart")}>
            Go to Cart
          </button>
        </div>
      ) : (
        <div className="checkout-layout">
          <form className="form-card" onSubmit={processPayment}>
            <div className="form-group">
              <label>Name on Card</label>
              <input
                type="text"
                name="cardName"
                value={paymentForm.cardName}
                onChange={handlePaymentChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={paymentForm.cardNumber}
                onChange={handlePaymentChange}
                placeholder="4242 4242 4242 4242"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Expiry</label>
                <input
                  type="text"
                  name="expiry"
                  value={paymentForm.expiry}
                  onChange={handlePaymentChange}
                  placeholder="12/28"
                  required
                />
              </div>

              <div className="form-group">
                <label>CVV</label>
                <input
                  type="password"
                  name="cvv"
                  value={paymentForm.cvv}
                  onChange={handlePaymentChange}
                  required
                />
              </div>
            </div>

            <button className="primary-button" type="submit">
              Pay ${Number(selectedOrder.price).toFixed(2)}
            </button>
          </form>

          <div className="summary-card">
            <h2>Payment Summary</h2>

            <div className="summary-row">
              <span>Order ID</span>
              <strong>{selectedOrder.id}</strong>
            </div>

            <div className="summary-row">
              <span>Customer</span>
              <strong>{selectedOrder.customerName}</strong>
            </div>

            <div className="summary-row">
              <span>Amount</span>
              <strong>${Number(selectedOrder.price).toFixed(2)}</strong>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default PaymentPage;