// import React, { useState } from 'react';

// const AdminDashboard = () => {
//   const [selectedSection, setSelectedSection] = useState('products');

//   return (
//     <div className="admin-dashboard">
//       {/* Sidebar */}
//       <div className="sidebar">
//         <button onClick={() => setSelectedSection('products')}>Manage Products</button>
//         <button onClick={() => setSelectedSection('orders')}>Manage Orders</button>
//         <button onClick={() => setSelectedSection('users')}>Manage Users</button>
//       </div>

//       {/* Main Content */}
//       <div className="content">
//         {selectedSection === 'products' && <div>🛒 Product Management Section</div>}
//         {selectedSection === 'orders' && <div>📦 Order Management Section</div>}
//         {selectedSection === 'users' && <div>👥 User Management Section</div>}
//       </div>


//       {/* ✅ CSS */}
//       <style>
//         {`
//           .admin-dashboard {
//             display: flex;
//             height: 100vh;
//           }
//           .sidebar {
//             width: 20%;
//             background-color: #f4f4f4;
//             padding: 1rem;
//             display: flex;
//             flex-direction: column;
//             gap: 1rem;
//           }
//           .content {
//             width: 80%;
//             padding: 1rem;
//           }
//           button {
//             padding: 10px;
//             background-color: #007bff;
//             color: white;
//             border: none;
//             cursor: pointer;
//             border-radius: 5px;
//           }
//           button:hover {
//             background-color: #0056b3;
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default AdminDashboard;




import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [selectedSection, setSelectedSection] = useState('products');
  const navigate = useNavigate();

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <div className="sidebar">
        <button onClick={() => setSelectedSection('products')}>Manage Products</button>
        <button onClick={() => setSelectedSection('orders')}>Manage Orders</button>
        <button onClick={() => setSelectedSection('users')}>Manage Users</button>
      </div>

      {/* Main Content */}
      <div className="content">
        {selectedSection === 'products' && (
          <div>
            <h2>🛒 Product Management Section</h2>
            <button className="add-product-btn" onClick={() => navigate('/add_product')}>
              ➕ Add Product
            </button>
          </div>
        )}
        {selectedSection === 'orders' && <div><h2>📦 Order Management Section</h2></div>}
        {selectedSection === 'users' && <div><h2>👥 User Management Section</h2></div>}
      </div>

      {/* ✅ CSS */}
      <style>
        {`
          .admin-dashboard {
            display: flex;
            height: 100vh;
          }
          .sidebar {
            width: 20%;
            background-color: #f4f4f4;
            padding: 4rem;
            display: flex;
            flex-direction: column;
            gap: 1rem;
          }
          .content {
            width: 80%;
            padding: 5rem;
            color: white;
          }
          button {
            padding: 10px;
            background-color: #007bff;
            color: white;
            border: none;
            cursor: pointer;
            border-radius: 5px;
          }
          button:hover {
            background-color: #0056b3;
          }
          .add-product-btn {
            margin-top: 10px;
            background-color: #28a745;
          }
          .add-product-btn:hover {
            background-color: #218838;
          }
        `}
      </style>
    </div>
  );
};

export default AdminDashboard;
