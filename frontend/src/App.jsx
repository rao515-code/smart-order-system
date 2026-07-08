import { useEffect, useMemo, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:8080/api/orders";

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [orders, setOrders] = useState([]);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    customerName: "",
    productName: "",
    quantity: 1,
    price: "",
  });

  const loadOrders = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error loading orders:", error);
      setMessage("Unable to load orders. Please check backend.");
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const summary = useMemo(() => {
    const totalOrders = orders.length;

    const totalRevenue = orders.reduce((total, order) => {
      return total + Number(order.price) * Number(order.quantity);
    }, 0);

    const latestOrder =
      orders.length > 0 ? [...orders].sort((a, b) => b.id - a.id)[0] : null;

    return {
      totalOrders,
      totalRevenue,
      latestOrder,
    };
  }, [orders]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const createOrder = async (event) => {
    event.preventDefault();

    const requestBody = {
      customerName: form.customerName,
      productName: form.productName,
      quantity: Number(form.quantity),
      price: Number(form.price),
    };

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        setMessage("Failed to create order.");
        return;
      }

      setForm({
        customerName: "",
        productName: "",
        quantity: 1,
        price: "",
      });

      setMessage("Order created successfully.");
      await loadOrders();
      setActivePage("orders");
    } catch (error) {
      console.error("Error creating order:", error);
      setMessage("Backend is not reachable.");
    }
  };

  const renderDashboard = () => (
    <section>
      <div className="page-header">
        <div>
          <h1>Smart Order Dashboard</h1>
          <p>React + Spring Boot + PostgreSQL + Kafka + Docker</p>
        </div>
        <button className="secondary-button" onClick={loadOrders}>
          Refresh
        </button>
      </div>

      <div className="cards">
        <div className="card">
          <h3>Total Orders</h3>
          <p>{summary.totalOrders}</p>
        </div>

        <div className="card">
          <h3>Total Revenue</h3>
          <p>${summary.totalRevenue.toFixed(2)}</p>
        </div>

        <div className="card">
          <h3>Latest Order</h3>
          <p>{summary.latestOrder ? summary.latestOrder.productName : "No orders"}</p>
        </div>
      </div>

      <div className="panel">
        <h2>Application Flow</h2>
        <div className="flow">
          <span>React UI</span>
          <span>→</span>
          <span>Spring Boot API</span>
          <span>→</span>
          <span>PostgreSQL</span>
          <span>→</span>
          <span>Kafka</span>
          <span>→</span>
          <span>Consumer</span>
        </div>
      </div>
    </section>
  );

  const renderCreateOrder = () => (
    <section>
      <div className="page-header">
        <div>
          <h1>Create Order</h1>
          <p>Create a new order and publish an event to Kafka.</p>
        </div>
      </div>

      <form className="form-card" onSubmit={createOrder}>
        <div className="form-group">
          <label>Customer Name</label>
          <input
            type="text"
            name="customerName"
            value={form.customerName}
            onChange={handleChange}
            placeholder="Enter customer name"
            required
          />
        </div>

        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="productName"
            value={form.productName}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={form.quantity}
              onChange={handleChange}
              min="1"
              required
            />
          </div>

          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              min="0.01"
              step="0.01"
              placeholder="Enter price"
              required
            />
          </div>
        </div>

        <button className="primary-button" type="submit">
          Create Order
        </button>
      </form>
    </section>
  );

  const renderOrders = () => (
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

  const renderArchitecture = () => (
    <section>
      <div className="page-header">
        <div>
          <h1>Project Architecture</h1>
          <p>How each part of the Smart Order System communicates.</p>
        </div>
      </div>

      <div className="architecture">
        <div className="arch-box">
          <h3>1. React Frontend</h3>
          <p>User creates orders from the UI. React calls Spring Boot REST APIs using fetch.</p>
        </div>

        <div className="arch-box">
          <h3>2. Spring Boot Backend</h3>
          <p>Controller receives requests, service handles business logic, repository saves data.</p>
        </div>

        <div className="arch-box">
          <h3>3. PostgreSQL</h3>
          <p>Stores order data in the orders table using Spring Data JPA.</p>
        </div>

        <div className="arch-box">
          <h3>4. Kafka</h3>
          <p>After saving an order, backend publishes OrderCreatedEvent to order.created topic.</p>
        </div>

        <div className="arch-box">
          <h3>5. Kafka Consumer</h3>
          <p>@KafkaListener receives the event and logs/processes the order details.</p>
        </div>
      </div>
    </section>
  );

  const renderAbout = () => (
    <section>
      <div className="page-header">
        <div>
          <h1>About Project</h1>
          <p>This project demonstrates full-stack development and event-driven architecture.</p>
        </div>
      </div>

      <div className="panel">
        <h2>Technologies Used</h2>
        <ul className="tech-list">
          <li>React frontend</li>
          <li>Spring Boot REST API</li>
          <li>Spring Data JPA</li>
          <li>PostgreSQL database</li>
          <li>Apache Kafka messaging</li>
          <li>Docker and Docker Compose</li>
          <li>Git and GitHub</li>
        </ul>
      </div>

    </section>
  );

  const renderPage = () => {
    if (activePage === "dashboard") return renderDashboard();
    if (activePage === "create") return renderCreateOrder();
    if (activePage === "orders") return renderOrders();
    if (activePage === "architecture") return renderArchitecture();
    if (activePage === "about") return renderAbout();
    return renderDashboard();
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <h2>Smart Order</h2>
        <button onClick={() => setActivePage("dashboard")}>Dashboard</button>
        <button onClick={() => setActivePage("create")}>Create Order</button>
        <button onClick={() => setActivePage("orders")}>Orders</button>
        <button onClick={() => setActivePage("architecture")}>Architecture</button>
        <button onClick={() => setActivePage("about")}>About</button>
      </aside>

      <main className="main-content">
        {message && <div className="message">{message}</div>}
        {renderPage()}
      </main>
    </div>
  );
}

export default App;