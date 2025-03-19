// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';

// const Signup = () => {
//   const [user, setUser] = useState({
//     username: '',
//     email: '',
//     password: ''
//   });

//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       await axios.post('http://localhost:8080/auth/signup', user);
//       alert('Signup successful! Please login.');
//       navigate('/login');
//     } catch (error) {
//       setError(error.response?.data || 'Signup failed');
//     }
//   };

//   return (
//     <div className="signup-container">
//       <div className="signup-form">
//         <h2>Signup</h2>
//         <form onSubmit={handleSubmit}>
//           {error && <div className="alert alert-danger">{error}</div>}


//           <div className="mb-3">
//             <input
//               type="text"
//               name="username"
//               value={user.username}
//               onChange={handleChange}
//               className="form-control"
//               placeholder="Username"
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="email"
//               name="email"
//               value={user.email}
//               onChange={handleChange}
//               className="form-control"
//               placeholder="Email"
//               required
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="password"
//               name="password"
//               value={user.password}
//               onChange={handleChange}
//               className="form-control"
//               placeholder="Password"
//               required
//             />

//           </div>
//           <button type="submit" className="btn btn-primary">Signup</button>
//         </form>

//         {/* ✅ Fixed link styling */}
//         <div className="login-link">
//           Already have an account? <Link to="/login">Login here</Link>
//         </div>
//       </div>
//     </div>

//   );
// };

// export default Signup;



////////////////////  ************************  SignupForm for Admin Functionality  *************************/////////////////


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Signup = () => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    role: 'USER',
    adminKey: '' // For admin access
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await axios.post('http://localhost:8080/auth/signup', user);
      alert('Signup successful! Please login.');
      navigate('/login');
    } catch (error) {
      setError(error.response?.data || 'Signup failed');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          {error && <div className="alert alert-danger">{error}</div>}


          {/* Role Dropdown */}
          <div className="form-group mb-3">
            <select
              name="role"
              value={user.role}
              onChange={handleChange}
              className="form-control"
            >
              <option value="User">USER</option>
              <option value="Admin">ADMIN</option>
            </select>
          </div>

          {/* Admin Key Field - Shown only when role is Admin */}
          {user.role === 'Admin' && (
            <div className="mb-3">
              <input
                type="password"
                name="adminKey"
                value={user.adminKey}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter Admin Key"
                required
              />
            </div>
          )}

          <div className="mb-3">
            <input
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              className="form-control"
              placeholder="Username"
              required
            />
          </div>
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

          

          <button type="submit" className="btn btn-primary">Signup</button>
        </form>

        <div className="login-link">
          Already have an account? <Link to="/login">Login here</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;