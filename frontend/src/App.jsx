import { useEffect, useMemo, useState } from "react";
import "./App.css";

import Sidebar from "./components/Sidebar";

import { getOrders, createOrder as createOrderApi } from "./services/orderService";
import { getProducts } from "./services/productService";
import { processPayment as processPaymentApi } from "./services/paymentService";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import PaymentPage from "./pages/PaymentPage";
import OrdersPage from "./pages/OrdersPage";
import ShipmentsPage from "./pages/ShipmentsPage";
import CustomersPage from "./pages/CustomersPage";
import ReportsPage from "./pages/ReportsPage";
import AboutPage from "./pages/AboutPage";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activePage, setActivePage] = useState("login");

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [payments, setPayments] = useState([]);
  const [shipments, setShipments] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [message, setMessage] = useState("");

  const [checkoutForm, setCheckoutForm] = useState({
    customerName: "",
    shippingAddress: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [paymentForm, setPaymentForm] = useState({
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  const loadOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error("Error loading orders:", error);
      setMessage("Backend is not reachable. Please check Docker containers.");
    }
  };

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error("Error loading products:", error);
      setMessage("Products could not be loaded. Please check backend.");
    }
  };

  useEffect(() => {
    loadOrders();
    loadProducts();
  }, []);

  const cartTotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const totalCartItems = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const dashboardSummary = useMemo(() => {
    const totalOrders = orders.length;

    const totalRevenue = orders.reduce((total, order) => {
      return total + Number(order.price);
    }, 0);

    const latestOrder =
      orders.length > 0 ? [...orders].sort((a, b) => b.id - a.id)[0] : null;

    const uniqueCustomers = new Set(orders.map((order) => order.customerName));

    return {
      totalOrders,
      totalRevenue,
      latestOrder,
      totalCustomers: uniqueCustomers.size,
      totalProducts: products.length,
      totalPayments: payments.length,
      totalShipments: shipments.length,
    };
  }, [orders, products, payments, shipments]);

  const handleLoginChange = (event) => {
    const { name, value } = event.target;

    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const handleLogin = (event) => {
    event.preventDefault();

    if (!loginForm.email || !loginForm.password) {
      setMessage("Please enter email and password.");
      return;
    }

    setIsLoggedIn(true);
    setActivePage("dashboard");
    setMessage("Login successful. Welcome to Smart Commerce.");
  };

  const logout = () => {
    setIsLoggedIn(false);
    setActivePage("login");
    setMessage("");
  };

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCart = cart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      setCart(updatedCart);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    setMessage(`${product.name} added to cart.`);
  };

  const increaseQuantity = (productId) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );

    setCart(updatedCart);
  };

  const decreaseQuantity = (productId) => {
    const updatedCart = cart
      .map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  const handleCheckoutChange = (event) => {
    const { name, value } = event.target;

    setCheckoutForm({
      ...checkoutForm,
      [name]: value,
    });
  };

  const placeOrder = async (event) => {
    event.preventDefault();

    if (cart.length === 0) {
      setMessage("Cart is empty.");
      return;
    }

    const productNames = cart
      .map((item) => `${item.name} x ${item.quantity}`)
      .join(", ");

    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

    const requestBody = {
      customerName: checkoutForm.customerName,
      productName: productNames,
      quantity: totalQuantity,
      price: cartTotal,
    };

    try {
      const savedOrder = await createOrderApi(requestBody);

      setSelectedOrder({
        ...savedOrder,
        shippingAddress: checkoutForm.shippingAddress,
        city: checkoutForm.city,
        state: checkoutForm.state,
        zipCode: checkoutForm.zipCode,
      });

      await loadOrders();

      setMessage("Order created successfully. Please complete payment.");
      setActivePage("payment");
    } catch (error) {
      console.error("Error placing order:", error);
      setMessage("Order creation failed. Please check backend.");
    }
  };

  const handlePaymentChange = (event) => {
    const { name, value } = event.target;

    setPaymentForm({
      ...paymentForm,
      [name]: value,
    });
  };

  const processPayment = async (event) => {
    event.preventDefault();

    if (!selectedOrder) {
      setMessage("Please place an order before payment.");
      return;
    }

    const paymentRequest = {
      orderId: selectedOrder.id,
      customerName: selectedOrder.customerName,
      amount: Number(selectedOrder.price),
    };

    try {
      const savedPayment = await processPaymentApi(paymentRequest);

      const shipment = {
        id: shipments.length + 1,
        orderId: selectedOrder.id,
        customerName: selectedOrder.customerName,
        address: selectedOrder.shippingAddress,
        city: selectedOrder.city,
        state: selectedOrder.state,
        zipCode: selectedOrder.zipCode,
        status: "READY_TO_SHIP",
        trackingNumber: `TRK-${Date.now()}`,
        createdAt: new Date().toLocaleString(),
      };

      setPayments([...payments, savedPayment]);
      setShipments([...shipments, shipment]);
      setCart([]);

      setCheckoutForm({
        customerName: "",
        shippingAddress: "",
        city: "",
        state: "",
        zipCode: "",
      });

      setPaymentForm({
        cardName: "",
        cardNumber: "",
        expiry: "",
        cvv: "",
      });

      setMessage("Payment saved in backend and shipment created.");
      setActivePage("shipments");
    } catch (error) {
      console.error("Error processing payment:", error);
      setMessage("Payment failed. Please check backend.");
    }
  };

  const renderPage = () => {
    if (!isLoggedIn) {
      return (
        <LoginPage
          loginForm={loginForm}
          handleLoginChange={handleLoginChange}
          handleLogin={handleLogin}
        />
      );
    }

    if (activePage === "dashboard") {
      return (
        <DashboardPage
          dashboardSummary={dashboardSummary}
          loadOrders={loadOrders}
        />
      );
    }

    if (activePage === "products") {
      return (
        <ProductsPage
          products={products}
          addToCart={addToCart}
          totalCartItems={totalCartItems}
          setActivePage={setActivePage}
        />
      );
    }

    if (activePage === "cart") {
      return (
        <CartPage
          cart={cart}
          cartTotal={cartTotal}
          increaseQuantity={increaseQuantity}
          decreaseQuantity={decreaseQuantity}
          removeFromCart={removeFromCart}
          setActivePage={setActivePage}
        />
      );
    }

    if (activePage === "checkout") {
      return (
        <CheckoutPage
          checkoutForm={checkoutForm}
          handleCheckoutChange={handleCheckoutChange}
          placeOrder={placeOrder}
          cart={cart}
          cartTotal={cartTotal}
        />
      );
    }

    if (activePage === "payment") {
      return (
        <PaymentPage
          selectedOrder={selectedOrder}
          paymentForm={paymentForm}
          handlePaymentChange={handlePaymentChange}
          processPayment={processPayment}
          setActivePage={setActivePage}
        />
      );
    }

    if (activePage === "orders") {
      return <OrdersPage orders={orders} loadOrders={loadOrders} />;
    }

    if (activePage === "shipments") {
      return <ShipmentsPage shipments={shipments} />;
    }

    if (activePage === "customers") {
      return <CustomersPage orders={orders} />;
    }

    if (activePage === "reports") {
      return <ReportsPage dashboardSummary={dashboardSummary} />;
    }

    if (activePage === "about") {
      return <AboutPage />;
    }

    return (
      <DashboardPage
        dashboardSummary={dashboardSummary}
        loadOrders={loadOrders}
      />
    );
  };

  return (
    <div className="app">
      {isLoggedIn && (
        <Sidebar
          setActivePage={setActivePage}
          totalCartItems={totalCartItems}
          logout={logout}
        />
      )}

      <main className={isLoggedIn ? "main-content" : "login-content"}>
        {message && <div className="message">{message}</div>}
        {renderPage()}
      </main>
    </div>
  );
}

export default App;