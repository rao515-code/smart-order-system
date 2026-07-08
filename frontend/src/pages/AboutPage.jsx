function AboutPage() {
  return (
    <section>
      <div className="page-header">
        <div>
          <h1>About</h1>
          <p>Smart Commerce is a full-stack order management application.</p>
        </div>
      </div>

      <div className="panel">
        <h2>Application Modules</h2>
        <ul className="tech-list">
          <li>Login and dashboard</li>
          <li>Product catalog</li>
          <li>Cart and checkout</li>
          <li>Mock payment processing</li>
          <li>Order management</li>
          <li>Shipment tracking</li>
          <li>Customer and report views</li>
        </ul>
      </div>

      <div className="panel">
        <h2>Technologies Used</h2>
        <ul className="tech-list">
          <li>React frontend</li>
          <li>Spring Boot REST API</li>
          <li>PostgreSQL database</li>
          <li>Apache Kafka messaging</li>
          <li>Docker Compose</li>
          <li>GitHub source control</li>
        </ul>
      </div>
    </section>
  );
}

export default AboutPage;