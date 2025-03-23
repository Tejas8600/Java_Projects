
import axios from "../axios";
import { useState, useEffect, createContext } from "react";

const AppContext = createContext({
  data: [],
  isError: "",
  loading: false,
  cart: [],
  selectedCategory: "", // ✅ Added selectedCategory state
  setSelectedCategory: () => {}, // ✅ Function to update category
  setData: () => {}, 
  addToCart: (product) => {},
  removeFromCart: (productId) => {},
  updateStockQuantity: (productId, newQuantity) => {},
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
  const [selectedCategory, setSelectedCategory] = useState(""); // ✅ New state for category
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

  // ✅ Update Quantity Logic
  const updateStockQuantity = (productId, newQuantity) => {
    const updatedCart = cart.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    );
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // ✅ Refresh Product Data (With Improved Filtering)
  const refreshData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        console.warn("❌ No token found in localStorage");
        setLoading(false);
        return;
      }

      console.log("🔎 Fetching data with token:", token);

      const response = await axios.get("/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // ✅ Filter by category if selected
      const filteredData = selectedCategory
        ? response.data.filter(
            (product) => product.category === selectedCategory
          )
        : response.data;

      setData(filteredData);
      setIsDataFetched(true);
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

  // ✅ UseEffect to refresh products when category changes
  useEffect(() => {
    refreshData(); // ✅ Refetch when category changes
  }, [selectedCategory]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  return (
    <AppContext.Provider
      value={{
        data,
        setData,
        isError,
        loading,
        cart,
        selectedCategory,
        setSelectedCategory, // ✅ Added function for category update
        addToCart,
        removeFromCart,
        updateStockQuantity,
        refreshData,
        clearCart,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;