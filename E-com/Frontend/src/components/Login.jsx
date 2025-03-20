import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import AppContext from '../Context/Context';

const Login = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
    role: 'USER', 
    adminKey: ''
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { refreshData } = useContext(AppContext);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: name === 'role' ? value.toUpperCase() : value
    });
  };

  // ✅ Handle Login Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const payload = {
        email: user.email,
        password: user.password,
        role: user.role,
      };

      if (user.role === 'ADMIN') {
        payload.adminKey = user.adminKey;
      }

      console.log("🔹 Sending Payload:", payload);

      const response = await axios.post('http://localhost:8080/auth/login', payload);
      console.log("🔹 Response Data:", response.data);

      const data = response.data;

      // ✅ Store token, role & email in localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role.toUpperCase());
      localStorage.setItem('userEmail', user.email);

      // ✅ Call refreshData() immediately after login
      refreshData();

      // ✅ Redirect based on role
      if (data.role.toUpperCase() === "ADMIN") {
        navigate('/admin-dashboard');
      } else {
        navigate('/home');
      }
    } catch (error) {
      console.error("❌ Login Error:", error);
      setError(error.response?.data || 'Login failed');
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          {/* ✅ Display Error */}
          {error && <div className="alert alert-danger">{error}</div>}

          {/* ✅ Role Selection */}
          <div className="form-group mb-3">
            <label>Select Your Role</label>
            <select
              name="role"
              value={user.role || "USER"}
              onChange={handleChange}
              className="form-control"
              required
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>

          {/* ✅ Admin Key - Only for Admin */}
          {user.role === 'ADMIN' && (
            <div className="mb-3">
              <input
                type="password"
                name="adminKey"
                value={user.adminKey || ''}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter Admin Key *"
                required
              />
            </div>
          )}

          {/* ✅ Email */}
          <div className="mb-3">
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Email"
              required
            />
          </div>

          {/* ✅ Password */}
          <div className="mb-3">
            <input
              type="password"
              name="password"
              value={user.password}
              onChange={handleChange}
              className="form-control"
              placeholder="Password"
              required
            />
          </div>

          {/* ✅ Submit Button */}
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>

        {/* ✅ Signup Link */}
        <div className="signup-link">
          Don't have an account? <Link to="/signup">Signup here</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;