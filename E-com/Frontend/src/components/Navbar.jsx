// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Navbar = ({ onSelectCategory }) => {
//   const getInitialTheme = () => {
//     const storedTheme = localStorage.getItem("theme");
//     return storedTheme ? storedTheme : "light-theme";
//   };

//   const [theme, setTheme] = useState(getInitialTheme());
//   const [input, setInput] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [noResults, setNoResults] = useState(false);
//   const [showSearchResults, setShowSearchResults] = useState(false);

//   useEffect(() => {
//     document.body.className = theme;
//   }, [theme]);

//   const fetchData = async (value) => {
//     try {
//       const response = await axios.get("http://localhost:8080/api/products");
//       setSearchResults(response.data);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleChange = async (value) => {
//     setInput(value);
//     if (value.length >= 1) {
//       setShowSearchResults(true);
//       try {
//         const response = await axios.get(
//           `http://localhost:8080/api/products/search?keyword=${value}`
//         );
//         setSearchResults(response.data);
//         setNoResults(response.data.length === 0);
//       } catch (error) {
//         console.error("Error searching:", error);
//       }
//     } else {
//       setShowSearchResults(false);
//       setSearchResults([]);
//       setNoResults(false);
//     }
//   };

//   const handleCategorySelect = (category) => {
//     onSelectCategory(category);
//   };

//   const toggleTheme = () => {
//     const newTheme = theme === "dark-theme" ? "light-theme" : "dark-theme";
//     setTheme(newTheme);
//     localStorage.setItem("theme", newTheme);
//   };

//   const categories = [
//     "Laptop",
//     "Headphone",
//     "Mobile",
//     "Electronics",
//     "Toys",
//     "Fashion",
//   ];

//   return (
//     <>
//       <header>
//         <nav className={`navbar navbar-expand-lg fixed-top ${theme}`}>
//           <div className="container-fluid">
//             {/* Logo */}
//             <a className="navbar-brand" href="https://tejas8600.github.io/Portfolio/">
//               Tejas Puri
//             </a>

//             {/* Toggle button for mobile view */}
//             <button
//               className="navbar-toggler"
//               type="button"
//               data-bs-toggle="collapse"
//               data-bs-target="#navbarSupportedContent"
//               aria-controls="navbarSupportedContent"
//               aria-expanded="false"
//               aria-label="Toggle navigation"
//             >
//               <span className="navbar-toggler-icon"></span>
//             </button>

//             {/* Navbar Items */}
//             <div
//               className="collapse navbar-collapse"
//               id="navbarSupportedContent"
//             >
//               <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                 <li className="nav-item">
//                   <a className="nav-link" aria-current="page" href="/">
//                     Home
//                   </a>
//                 </li>
//                 <li className="nav-item">
//                   <a className="nav-link" href="/add_product">
//                     Add Product
//                   </a>
//                 </li>
//                 <li className="nav-item dropdown">
//                   <a
//                     className="nav-link dropdown-toggle"
//                     href="/"
//                     role="button"
//                     data-bs-toggle="dropdown"
//                     aria-expanded="false"
//                   >
//                     Categories
//                   </a>
//                   <ul className="dropdown-menu">
//                     {categories.map((category) => (
//                       <li key={category}>
//                         <button
//                           className="dropdown-item"
//                           onClick={() => handleCategorySelect(category)}
//                         >
//                           {category}
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 </li>
//               </ul>

//               {/* Search Bar */}
//               <div className="d-flex align-items-center me-3">
//                 <input
//                   className="form-control me-2"
//                   type="search"
//                   placeholder="Search"
//                   aria-label="Search"
//                   value={input}
//                   onChange={(e) => handleChange(e.target.value)}
//                   style={{ color: "black" }}
//                 />
//                 {showSearchResults && (
//                   <ul className="list-group position-absolute">
//                     {searchResults.length > 0 ? (
//                       searchResults.map((result) => (
//                         <li key={result.id} className="list-group-item">
//                           <a href={`/product/${result.id}`}>
//                             {result.name}
//                           </a>
//                         </li>
//                       ))
//                     ) : (
//                       noResults && (
//                         <li className="list-group-item text-danger">
//                           No product with such name
//                         </li>
//                       )
//                     )}
//                   </ul>
//                 )}
//               </div>

//               {/* Cart */}
//               <a href="/cart" className="nav-link me-3">
//                 <i className="bi bi-cart"></i> Cart
//               </a>

//               {/* Theme Button */}
//               <button
//                 className="btn btn-outline-secondary me-2"
//                 onClick={toggleTheme}
//               >
//                 {theme === "dark-theme" ? (
//                   <i className="bi bi-moon-fill"></i>
//                 ) : (
//                   <i className="bi bi-sun-fill"></i>
//                 )}
//               </button>

//               {/* Login & Signup Buttons */}
//               <div className="d-flex">
//                 <a href="/login" className="btn btn-outline-primary me-2">
//                   Login
//                 </a>
//                 <a href="/signup" className="btn btn-primary">
//                   Signup
//                 </a>
//               </div>
//             </div>
//           </div>
//         </nav>
//       </header>

//       {/* ✅ CSS */}
//       <style>
//         {`
//           .navbar {
//             background-color: var(--navbar-bg);
//           }
//           .navbar .nav-link,
//           .navbar-brand,
//           .navbar-toggler-icon,
//           .list-group-item a {
//             color: var(--text-color) !important;
//           }
//           .form-control {
//             color: black !important;
//           }

//           /* Light Theme */
//           .light-theme {
//             --navbar-bg: #f8f9fa;
//             --text-color: #000;
//           }

//           /* Dark Theme */
//           .dark-theme {
//             --navbar-bg: #212529;
//             --text-color: #fff;
//           }
//         `}
//       </style>
//     </>
//   );
// };

// export default Navbar;





//******************************** navbar according to profile ******************************** */
import React, { useEffect, useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/Context";

const Navbar = () => {
  const getInitialTheme = () => localStorage.getItem("theme") || "light-theme";

  const [theme, setTheme] = useState(getInitialTheme());
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [loading, setLoading] = useState(false);

  const { cart, setData, setSelectedCategory } = useContext(AppContext);

  const token = localStorage.getItem("token");
  console.log("📌 Token:", token); //Debugging


  const role = localStorage.getItem("role");
  const userEmail = localStorage.getItem("userEmail");
  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // ✅ Handle Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  // ✅ Handle Search
  const handleChange = async (value) => {
    setInput(value);
    if (value.length > 0) {
      setShowSearchResults(true);
      setLoading(true);
      try {
        if (!token) {
          console.error("❌ No token found in localStorage");
          return;
        }

        const response = await axios.get(
          `http://localhost:8080/api/products/search?keyword=${value}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setSearchResults(response.data);
        setData(response.data);
      } catch (error) {
        console.error("❌ Error searching:", error);
        setSearchResults([]);
      } finally {
        setLoading(false);
      }
    } else {
      setShowSearchResults(false);
      setSearchResults([]);
    }
  };

  // ✅ Handle Category Selection
  const handleCategorySelect = async (category) => {
    setSelectedCategory(category);
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("❌ No token found in localStorage");
        return;
      }

      console.log(`📌 Fetching products for category: ${category}`);

      const response = await axios.get(
        `http://localhost:8080/api/products/category/${category}`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Fix token format
          },
        }
      );

      if (response.data.length > 0) {
        setData(response.data);
        console.log(`✅ Products fetched for category: ${category}`, response.data);
      } else {
        console.warn(`⚠️ No products found for category: ${category}`);
        setData([]);
      }
    } catch (error) {
      console.error("❌ Error fetching category products:", error);

      // ✅ Show alert only if no data fetched after final attempt
      if (error.response && error.response.status === 403) {
        setTimeout(() => {
          alert("❌ Access forbidden. Please check your permissions.");
        }, 300); // ✅ Delay to avoid false alert
      }
    } finally {
      setLoading(false);
    }
  };

  // ✅ Theme Toggle
  const toggleTheme = () => {
    const newTheme = theme === "dark-theme" ? "light-theme" : "dark-theme";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <nav className={`navbar navbar-expand-lg fixed-top ${theme}`}>
      <div className="container-fluid"> 
        {/* ✅ Logo */}
        <a
          className="navbar-brand"
          href="https://tejas8600.github.io/Portfolio/"
        >
          Tejas Puri
        </a>

        {/* ✅ Hamburger Menu */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* ✅ Left Section (Home + Categories) */}
          <ul className="navbar-nav me-auto align-items-center">
            <li className="nav-item">
              <Link className="nav-link" to="/home">
                Home
              </Link>
            </li>

            {/* ✅ Categories */}
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="categoryDropdown"
                role="button"
                data-bs-toggle="dropdown"
              >
                Categories
              </Link>
              <ul className="dropdown-menu">
                {[
                  "Laptop",
                  "Headphone",
                  "Mobile",
                  "Electronics",
                  "Toys",
                  "Fashion",
                ].map((category) => (
                  <li key={category}>
                    <button
                      className="dropdown-item"
                      onClick={() => handleCategorySelect(category)}
                    >
                      {category}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          </ul>

          {/* ✅ Center Section (Search Bar) */}
          <form className="d-flex me-auto search-form">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              value={input}
              onChange={(e) => handleChange(e.target.value)}
              aria-label="Search"
            />
            {loading && (
              <span className="spinner-border spinner-border-sm ms-2" />
            )}
            {showSearchResults && (
              <ul className="list-group position-absolute search-results">
                {searchResults.length > 0 ? (
                  searchResults.map((result) => (
                    <li key={result.id} className="list-group-item">
                      <Link to={`/product/${result.id}`}>
                        {result.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  !loading && (
                    <li className="list-group-item text-danger">
                      No product with such name
                    </li>
                  )
                )}
              </ul>
            )}
          </form>

          {/* ✅ Right Section (User Info + Cart + Theme + Logout) */}
          <div className="d-flex align-items-center gap-3">
            {token && userEmail && (
              <span className="nav-link text-dark fw-semibold">
                {`Welcome, ${userEmail.split("@")[0]}`}
              </span>
            )}

            {token && (
              <Link className="nav-link" to="/cart">
                <i className="bi bi-cart-fill"></i>
                {cart.length > 0 && (
                  <span className="badge bg-danger ms-1">
                    {cart.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </Link>
            )}

            {/* ✅ Theme Toggle */}
            <button className="btn btn-outline-secondary" onClick={toggleTheme}>
              {theme === "dark-theme" ? (
                <i className="bi bi-moon-fill"></i>
              ) : (
                <i className="bi bi-sun-fill"></i>
              )}
            </button>

            {/* ✅ Logout */}
            {token ? (
              <button className="btn btn-danger" onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <>
                <Link className="btn btn-outline-primary" to="/login">
                  Login
                </Link>
                <Link className="btn btn-primary" to="/signup">
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ✅ Custom CSS */}
      <style>
        {`
          .navbar {
            background-color: var(--navbar-bg);
            padding: 12px 20px;
          }
          .nav-link {
            font-size: 16px;
            font-weight: 500;
            color: var(--text-color) !important;
          }
          .search-results {
            top: 40px;
            width: 100%;
            z-index: 10;
          }
          .light-theme {
            --navbar-bg: #f8f9fa;
            --text-color: #212529;
          }
          .dark-theme {
            --navbar-bg: #212529;
            --text-color: #f8f9fa;
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;