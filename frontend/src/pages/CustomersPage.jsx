function CustomersPage({ orders }) {
  const customerNames = [...new Set(orders.map((order) => order.customerName))];

  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Customers</h1>
          <p>Customers created from order activity.</p>
        </div>
      </div>

      {customerNames.length === 0 ? (
        <div className="empty-state">
          <h2>No customers yet</h2>
          <p>Create an order to see customers here.</p>
        </div>
      ) : (
        <div className="customer-grid">
          {customerNames.map((customerName) => (
            <div className="customer-card" key={customerName}>
              <div className="avatar">{customerName.charAt(0).toUpperCase()}</div>
              <h3>{customerName}</h3>
              <p>
                Orders:{" "}
                {orders.filter((order) => order.customerName === customerName).length}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default CustomersPage;