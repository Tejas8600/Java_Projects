import axios from "../axios";
import { useState, useEffect, createContext } from "react";

const AppContext = createContext({
  data: [],
  isError: "",
  loading: false,
  cart: [],
  addToCart: (product) => {},
  removeFromCart: (productId) => {},
  refreshData: () => {},
  clearCart: () => {},
});

export const AppProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [isError, setIsError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || []
  );
  const [isDataFetched, setIsDataFetched] = useState(false);

  console.log("✅ Context initialized");

  // ✅ Add to Cart Logic
  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex(
      (item) => item.id === product.id
    );
    if (existingProductIndex !== -1) {
      const updatedCart = cart.map((item, index) =>
        index === existingProductIndex
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const updatedCart = [...cart, { ...product, quantity: 1 }];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  };

  // ✅ Remove from Cart Logic
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // ✅ Refresh Product Data (With Improved Logic)
  const refreshData = async () => {
    if (isDataFetched) {
      console.log("⚠️ Data already fetched. Skipping fetch.");
      return;  // ✅ Stop duplicate requests
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("❌ No token found in localStorage");
        setLoading(false);
        return;
      }

      console.log("🔎 Token before sending request:", token);

      const response = await axios.get("/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("✅ Data fetched from backend:", response.data);
      setData(response.data);
      setIsDataFetched(true); // ✅ Mark data as fetched
    } catch (error) {
      console.error("❌ Error fetching products:", error.message);
      setIsError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Clear Cart Logic
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  // ✅ Use only 1 `useEffect` to ensure `refreshData()` runs once
  useEffect(() => {
    if (!isDataFetched) {
      refreshData();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <AppContext.Provider
      value={{
        data,
        isError,
        loading,
        cart,
        addToCart,
        removeFromCart,
        refreshData,
        clearCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;



// import axios from "../axios";
// import { useState, useEffect, createContext } from "react";



// const AppContext = createContext({
//   data: [],
//   isError: "",
//   cart: [],
//   addToCart: (product) => {},
//   removeFromCart: (productId) => {},
//   refreshData:() =>{},
//   updateStockQuantity: (productId, newQuantity) =>{}
  
// });



// export const AppProvider = ({ children }) => {
//   const [data, setData] = useState([]);
//   const [isError, setIsError] = useState("");
//   const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) || []);
//   console.log('Context initialized:', cart); //Debugging
  


//   const addToCart = (product) => {
//     console.log("addToCart called with:", product); // Debugging
//     const existingProductIndex = cart.findIndex((item) => item.id === product.id);
//     if (existingProductIndex !== -1) {
//       const updatedCart = cart.map((item, index) =>
//         index === existingProductIndex
//           ? { ...item, quantity: item.quantity + 1 }
//           : item
//       );
//       setCart(updatedCart);
//       console.log('Updated cart state:', updatedCart); //Debugging
//       localStorage.setItem('cart', JSON.stringify(updatedCart));
//     } else {
//       const updatedCart = [...cart, { ...product, quantity: 1 }];
//       setCart(updatedCart);
//       console.log('Updated cart state:', updatedCart); //Debugging
//       localStorage.setItem('cart', JSON.stringify(updatedCart));
//     }
    
//   };

//   const removeFromCart = (productId) => {
//     console.log("productID",productId)
//     const updatedCart = cart.filter((item) => item.id !== productId);
//     setCart(updatedCart);
//     localStorage.setItem('cart', JSON.stringify(updatedCart));
//     console.log("CART",cart)
//   };


//   const refreshData = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       console.log("🔎 Token before sending request:", token); // ✅ Debugging token
  
//       if (!token) {
//         console.log("❌ No token found in localStorage");
//         return; // Stop execution if token is missing
//       }
  
//       const response = await axios.get("/products", {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       setData(response.data);
//     } catch (error) {
//       console.error("❌ Error fetching products:", error.message);
//       setIsError(error.message);
//     }
//   };

  
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       console.log("🔎 Token found, fetching data...");
//       refreshData(); // ✅ Trigger only if token exists
//     } else {
//       console.log("❌ No token found, skipping data fetch.");
//     }
//   }, []);


//   const clearCart =() =>{
//     setCart([]);
//   }
  
//   useEffect(() => {
//     refreshData();
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cart));
//   }, [cart]);
  
//   return (
//     <AppContext.Provider value={{ data, isError, cart, addToCart, removeFromCart,refreshData, clearCart  }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// export default AppContext;