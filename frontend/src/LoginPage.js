import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div>
      <h1>Login Page</h1>
      <p>Please fill in this form to log into your account.</p>
      <form>
        <label htmlFor="username">Username:</label>
        <input type="text" id="username" name="username" required />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required />
        <button type="submit">Login</button>
      </form>
      <div className="auth-buttons">
        <Link to="/">
          <button className="auth-button">Main Menu</button>
        </Link>
        <Link to="/register">
          <button className="auth-button">Register</button>
        </Link>
      </div>
    </div>
  );
};

export default LoginPage;
