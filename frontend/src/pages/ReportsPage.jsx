function ReportsPage({ dashboardSummary }) {
  const averageOrderValue =
    dashboardSummary.totalOrders === 0
      ? 0
      : dashboardSummary.totalRevenue / dashboardSummary.totalOrders;

  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Reports</h1>
          <p>Business metrics and order performance.</p>
        </div>
      </div>

      <div className="cards">
        <div className="card">
          <h3>Revenue</h3>
          <p>${dashboardSummary.totalRevenue.toFixed(2)}</p>
        </div>

        <div className="card">
          <h3>Orders</h3>
          <p>{dashboardSummary.totalOrders}</p>
        </div>

        <div className="card">
          <h3>Average Order Value</h3>
          <p>${averageOrderValue.toFixed(2)}</p>
        </div>
      </div>
    </section>
  );
}

export default ReportsPage;