function ShipmentsPage({ shipments }) {
  return (
    <section>
      <div className="page-header">
        <div>
          <h1>Shipments</h1>
          <p>Track shipment details created after payment.</p>
        </div>
      </div>

      {shipments.length === 0 ? (
        <div className="empty-state">
          <h2>No shipments yet</h2>
          <p>Complete payment to create a shipment.</p>
        </div>
      ) : (
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>Shipment ID</th>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Tracking Number</th>
                <th>Status</th>
                <th>Address</th>
              </tr>
            </thead>

            <tbody>
              {shipments.map((shipment) => (
                <tr key={shipment.id}>
                  <td>{shipment.id}</td>
                  <td>{shipment.orderId}</td>
                  <td>{shipment.customerName}</td>
                  <td>{shipment.trackingNumber}</td>
                  <td>
                    <span className="status">{shipment.status}</span>
                  </td>
                  <td>
                    {shipment.address}, {shipment.city}, {shipment.state}{" "}
                    {shipment.zipCode}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default ShipmentsPage;