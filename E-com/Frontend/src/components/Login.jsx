// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, Link } from 'react-router-dom';



// const Login = () => {
//   const [user, setUser] = useState({
//     email: '',
//     password: ''
//   });

//   const [error, setError] = useState('');
//   const navigate = useNavigate();

  

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser({ ...user, [name]: value });
//   };

  

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();
//   //   setError('');

//   //   try {
//   //     const response = await axios.post('http://localhost:8080/auth/login', user);
//   //     alert('Login successful!');
//   //     localStorage.setItem('user', JSON.stringify(response.data));
//   //     navigate('/');
//   //   } catch (error) {
//   //     setError(error.response?.data || 'Login failed');
//   //   }
//   // };



//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
  
//     try {
//       const payload = {
//         email: user.email,
//         password: user.password,
//         role: user.role,
//         ...(user.role === 'Admin' && { adminKey: user.adminKey })
//       };
  
//       const response = await axios.post('http://localhost:8080/auth/login', payload);
//       console.log(response.data); // Debuging
//       const data = response.data;
  
//       localStorage.setItem('token', data.token);
//       localStorage.setItem('role', data.role);
  
//       if (data.role === 'Admin') {
//         window.location.href = '/admin-dashboard';
//       } else {
//         window.location.href = '/user-dashboard';
//       }
//     } catch (error) {
//       setError(error.response?.data || 'Login failed');
//     }
//   };



  


//   return (
//     <div className="login-container">
//       <div className="login-form">
//         <h2>Login</h2>
//         <form onSubmit={handleSubmit}>
//           {error && <div className="alert alert-danger">{error}</div>}


//           {/* Adding Admin functionality  */}

//           <div className="form-group mb-3">
//             <label>Select Your Role</label>
//             <select
//               name="role"
//               value={user.role}
//               onChange={handleChange}
//               className="form-control"
//             >
//               <option value="" disabled>Choose Role...</option>
//               <option value="User">USER</option>
//               <option value="Admin">ADMIN</option>
//             </select>
//           </div>

//           {/* Admin Key Field - Only for Admin */}
//           {user.role === 'Admin' && (
//             <div className="mb-3">
//               <input
//                 type="password"
//                 name="adminKey"
//                 value={user.adminKey}
//                 onChange={handleChange}
//                 className="form-control"
//                 placeholder="Enter Admin Key *"
//                 required
//               />
//             </div>
//           )}




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

//           <button type="submit" className="btn btn-primary">Login</button>
//         </form>

//         {/* ✅ Added signup link */}
//         <div className="signup-link">
//           Don't have an account? <Link to="/signup">Signup here</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  // ✅ Initialize role and adminKey to avoid undefined state
  const [user, setUser] = useState({
    email: '',
    password: '',
    role: 'USER',  // ✅ Default to uppercase for consistency
    adminKey: ''   // ✅ Default empty adminKey (only used for admins)
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();

  // ✅ Ensure role is always in uppercase
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: name === "role" ? value.toUpperCase() : value // ✅ Convert role to uppercase
    });
  };

  // ✅ Handle Login Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // ✅ Construct the payload properly
      const payload = {
        email: user.email,
        password: user.password
      };

      if (user.role === 'ADMIN') {
        payload.role = 'ADMIN';  // ✅ Ensure admin role is uppercase
        payload.adminKey = user.adminKey; // ✅ Only send adminKey if role is ADMIN
      }

      // ✅ Log payload before sending (debugging)
      console.log("🔹 Sending Payload:", payload);

      // ✅ Send login request to backend
      const response = await axios.post('http://localhost:8080/auth/login', payload);
      console.log("🔹 Response Data:", response.data);  // ✅ Debugging

      const data = response.data;

      // ✅ Store token & role in localStorage (ensure role is uppercase)
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role.toUpperCase());

      // ✅ Redirect based on role
      if (data.role.toUpperCase() === "ADMIN") {
        window.location.href = '/admin-dashboard';
      } else {
        window.location.href = '/user-dashboard';
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
          {error && <div className="alert alert-danger">{error}</div>}

          {/* ✅ Role Selection Dropdown */}
          <div className="form-group mb-3">
            <label>Select Your Role</label>
            <select
              name="role"
              value={user.role || "USER"}  // ✅ Prevent undefined value
              onChange={handleChange}
              className="form-control"
            >
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>

          {/* ✅ Admin Key Field - Only for Admin */}
          {user.role === 'ADMIN' && (
            <div className="mb-3">
              <input
                type="password"
                name="adminKey"
                value={user.adminKey || ''}  // ✅ Prevent undefined value
                onChange={handleChange}
                className="form-control"
                placeholder="Enter Admin Key *"
                required
              />
            </div>
          )}

          {/* ✅ Email Input */}
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

          {/* ✅ Password Input */}
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
          <button type="submit" className="btn btn-primary">Login</button>
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
