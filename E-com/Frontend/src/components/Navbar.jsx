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

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Navbar = ({ onSelectCategory }) => {
  const getInitialTheme = () => localStorage.getItem("theme") || "light-theme";

  const [theme, setTheme] = useState(getInitialTheme());
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  // console.log("Role from localStorage:", role);

  const navigate = useNavigate();

  useEffect(() => {
    document.body.className = theme;
  }, [theme, role]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleChange = async (value) => {
    setInput(value);
    if (value.length >= 1) {
      setShowSearchResults(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/api/products/search?keyword=${value}`
        );
        setSearchResults(response.data);
        setNoResults(response.data.length === 0);
      } catch (error) {
        console.error("Error searching:", error);
      }
    } else {
      setShowSearchResults(false);
      setSearchResults([]);
      setNoResults(false);
    }
  };

  const handleCategorySelect = (category) => onSelectCategory(category);

  const toggleTheme = () => {
    const newTheme = theme === "dark-theme" ? "light-theme" : "dark-theme";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const categories = ["Laptop", "Headphone", "Mobile", "Electronics", "Toys", "Fashion"];

  return (
    <>
      <header>
        <nav className={`navbar navbar-expand-lg fixed-top ${theme}`}>
          <div className="container-fluid">
            <a className="navbar-brand" href="https://tejas8600.github.io/Portfolio/">
              Tejas Puri
            </a>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>

                {/* Admin Links */}
                {/* {token && role === "ADMIN" && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/admin-dashboard">
                        Dashboard
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/add_product">
                        Add Product
                      </Link>
                    </li>
                  </>
                )} */}

                {/* User Links */}
                {token && role === "USER" && (
                  <>
                    <li className="nav-item">
                      <Link className="nav-link" to="/profile">
                        Profile
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/cart">
                        My Cart
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link className="nav-link" to="/orders">
                        My Orders
                      </Link>
                    </li>
                  </>
                )}

                {/* Category Dropdown */}
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="/" data-bs-toggle="dropdown">
                    Categories
                  </a>
                  <ul className="dropdown-menu">
                    {categories.map((category) => (
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

              {/* Search Bar */}
              <div className="d-flex align-items-center me-3">
                <input
                  className="form-control me-2"
                  type="search"
                  placeholder="Search"
                  value={input}
                  onChange={(e) => handleChange(e.target.value)}
                />
                {showSearchResults && (
                  <ul className="list-group position-absolute">
                    {searchResults.length > 0 ? (
                      searchResults.map((result) => (
                        <li key={result.id} className="list-group-item">
                          <Link to={`/product/${result.id}`}>{result.name}</Link>
                        </li>
                      ))
                    ) : (
                      noResults && (
                        <li className="list-group-item text-danger">
                          No product with such name
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>

              {/* Theme Toggle */}
              <button className="btn btn-outline-secondary me-2" onClick={toggleTheme}>
                {theme === "dark-theme" ? (
                  <i className="bi bi-moon-fill"></i>
                ) : (
                  <i className="bi bi-sun-fill"></i>
                )}
              </button>

              {/* Auth Buttons */}
              {token ? (
                <button className="btn btn-danger me-2" onClick={handleLogout}>
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login" className="btn btn-outline-primary me-2">
                    Login
                  </Link>
                  <Link to="/signup" className="btn btn-primary">
                    Signup
                  </Link>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>

      {/* ✅ CSS */}
      <style>
        {`
          .btn-primary {
            width: auto;
            padding: 8px 16px;
          }
          .navbar {
            background-color: var(--navbar-bg);
          }
          .navbar .nav-link,
          .navbar-brand,
          .navbar-toggler-icon,
          .list-group-item a {
            color: var(--text-color) !important;
          }
          .form-control {
            color: black !important;
          }
          /* Light Theme */
          .light-theme {
            --navbar-bg: #f8f9fa;
            --text-color: #000;
          }
          /* Dark Theme */
          .dark-theme {
            --navbar-bg: #212529;
            --text-color: #fff;
          }
        `}
      </style>
    </>
  );
};

export default Navbar;