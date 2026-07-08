function DashboardPage({ dashboardSummary, loadOrders }) {
  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p>Overview of orders, revenue, products, payments, and shipments.</p>
        </div>

        <button className="secondary-button" onClick={loadOrders}>
          Refresh
        </button>
      </div>

      <div className="cards">
        <div className="card">
          <h3>Total Orders</h3>
          <p>{dashboardSummary.totalOrders}</p>
        </div>

        <div className="card">
          <h3>Total Revenue</h3>
          <p>${dashboardSummary.totalRevenue.toFixed(2)}</p>
        </div>

        <div className="card">
          <h3>Products</h3>
          <p>{dashboardSummary.totalProducts}</p>
        </div>

        <div className="card">
          <h3>Customers</h3>
          <p>{dashboardSummary.totalCustomers}</p>
        </div>

        <div className="card">
          <h3>Payments</h3>
          <p>{dashboardSummary.totalPayments}</p>
        </div>

        <div className="card">
          <h3>Shipments</h3>
          <p>{dashboardSummary.totalShipments}</p>
        </div>
      </div>

      <div className="panel">
        <h2>Latest Order</h2>

        {dashboardSummary.latestOrder ? (
          <div className="detail-grid">
            <div>
              <strong>Order ID</strong>
              <span>{dashboardSummary.latestOrder.id}</span>
            </div>

            <div>
              <strong>Customer</strong>
              <span>{dashboardSummary.latestOrder.customerName}</span>
            </div>

            <div>
              <strong>Product</strong>
              <span>{dashboardSummary.latestOrder.productName}</span>
            </div>

            <div>
              <strong>Status</strong>
              <span>{dashboardSummary.latestOrder.status}</span>
            </div>
          </div>
        ) : (
          <p>No orders created yet.</p>
        )}
      </div>
    </section>
  );
}

export default DashboardPage;