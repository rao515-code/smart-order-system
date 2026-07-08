function OrdersPage({ orders, loadOrders }) {
  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Orders</h1>
          <p>Orders loaded from PostgreSQL through Spring Boot API.</p>
        </div>

        <button className="secondary-button" onClick={loadOrders}>
          Reload Orders
        </button>
      </div>

      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Status</th>
              <th>Created At</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.customerName}</td>
                <td>{order.productName}</td>
                <td>{order.quantity}</td>
                <td>${order.price}</td>
                <td>
                  <span className="status">{order.status}</span>
                </td>
                <td>{order.createdAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default OrdersPage;