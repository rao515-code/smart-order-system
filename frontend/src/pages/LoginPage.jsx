function LoginPage({ loginForm, handleLoginChange, handleLogin }) {
  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Smart Commerce</h1>
        <p>Login to manage products, orders, payments, and shipments.</p>

        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={loginForm.email}
              onChange={handleLoginChange}
              placeholder="admin@smartcommerce.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={loginForm.password}
              onChange={handleLoginChange}
              placeholder="Enter password"
              required
            />
          </div>

          <button className="primary-button full-width" type="submit">
            Login
          </button>
        </form>

        <div className="demo-login">
          <strong>Demo:</strong> Use any email and password.
        </div>
      </div>
    </div>
  );
}

export default LoginPage;