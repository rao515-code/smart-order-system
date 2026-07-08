function Sidebar({ setActivePage, totalCartItems, logout }) {
  return (
    <aside className="sidebar">
      <h2>Smart Commerce</h2>

      <button onClick={() => setActivePage("dashboard")}>Dashboard</button>
      <button onClick={() => setActivePage("products")}>Products</button>
      <button onClick={() => setActivePage("cart")}>Cart ({totalCartItems})</button>
      <button onClick={() => setActivePage("checkout")}>Checkout</button>
      <button onClick={() => setActivePage("payment")}>Payment</button>
      <button onClick={() => setActivePage("orders")}>Orders</button>
      <button onClick={() => setActivePage("shipments")}>Shipments</button>
      <button onClick={() => setActivePage("customers")}>Customers</button>
      <button onClick={() => setActivePage("reports")}>Reports</button>
      <button onClick={() => setActivePage("about")}>About</button>

      <button className="logout-button" onClick={logout}>
        Logout
      </button>
    </aside>
  );
}

export default Sidebar;