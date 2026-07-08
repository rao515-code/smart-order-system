import { useEffect, useState } from "react";

function App() {
  const [orders, setOrders] = useState([]);

  const [form, setForm] = useState({
    customerName: "",
    productName: "",
    quantity: 1,
    price: 0,
  });

  const API_URL = "http://localhost:8080/api/orders";

  const loadOrders = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Error loading orders:", error);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

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
        alert("Failed to create order");
        return;
      }

      setForm({
        customerName: "",
        productName: "",
        quantity: 1,
        price: 0,
      });

      loadOrders();
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>Smart Order System</h1>

      <h2>Create Order</h2>

      <form onSubmit={createOrder} style={{ marginBottom: "30px" }}>
        <div>
          <label>Customer Name: </label>
          <input
            type="text"
            name="customerName"
            value={form.customerName}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Product Name: </label>
          <input
            type="text"
            name="productName"
            value={form.productName}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <div>
          <label>Quantity: </label>
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <br />

        <div>
          <label>Price: </label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            min="0.01"
            step="0.01"
            required
          />
        </div>

        <br />

        <button type="submit">Create Order</button>
      </form>

      <h2>Orders</h2>

      <table border="1" cellPadding="10" cellSpacing="0">
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
              <td>{order.price}</td>
              <td>{order.status}</td>
              <td>{order.createdAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;