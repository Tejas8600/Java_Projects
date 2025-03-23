import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import AppContext from "../Context/Context";
import unplugged from "../assets/unplugged.png";

const Home = () => {
  const {
    data,
    isError,
    addToCart,
    refreshData,
    loading,
    setData,
    selectedCategory, // ✅ Get from context directly
  } = useContext(AppContext);
  
  const [products, setProducts] = useState([]);

  // ✅ Trigger refreshData only if data is empty
  useEffect(() => {
    if (data.length === 0) {
      console.log("🔎 Refreshing data from Home component...");
      refreshData();
    }
  }, [data, refreshData]);

  // ✅ Fetch images for products and update products state
  useEffect(() => {
    const fetchImagesAndUpdateProducts = async () => {
      if (data.length > 0) {
        try {
          const updatedProducts = await Promise.all(
            data.map(async (product) => {
              try {
                const token = localStorage.getItem("token");
                const response = await axios.get(
                  `http://localhost:8080/api/product/${product.id}/image`,
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                    responseType: "blob",
                  }
                );
                const imageUrl = URL.createObjectURL(response.data);
                return { ...product, imageUrl };
              } catch (error) {
                console.error(
                  "❌ Error fetching image for product ID:",
                  product.id,
                  error.message
                );
                return { ...product, imageUrl: unplugged };
              }
            })
          );
          setProducts(updatedProducts);
        } catch (error) {
          console.error("❌ Error updating products:", error.message);
        }
      }
    };

    fetchImagesAndUpdateProducts();
  }, [data]);

  // ✅ Filter products by selected category
  useEffect(() => {
    if (selectedCategory) {
      console.log(`📌 Filtering products by category: ${selectedCategory}`);
      const filtered = data.filter(
        (product) => product.category === selectedCategory
      );
      setProducts(filtered);
    } else {
      setProducts(data);
    }
  }, [selectedCategory, data]);

  // ✅ Handle Error Case
  if (isError) {
    return (
      <div className="text-center" style={{ padding: "18rem" }}>
        <img
          src={unplugged}
          alt="Error"
          style={{ width: "100px", height: "100px" }}
        />
        <p>{isError}</p>
      </div>
    );
  }

  // ✅ Handle Loading Case
  if (loading) {
    return (
      <div className="text-center" style={{ padding: "18rem" }}>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <>
      <div
        className="grid"
        style={{
          marginTop: "64px",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          padding: "20px",
        }}
      >
        {products.length === 0 ? (
          <h2
            className="text-center"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            No Products Available
          </h2>
        ) : (
          products.map((product) => {
            const { id, brand, name, price, productAvailable, imageUrl } =
              product;

            return (
              <div
                className="card mb-3"
                key={id}
                style={{
                  width: "250px",
                  height: "360px",
                  boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                  borderRadius: "10px",
                  overflow: "hidden",
                  backgroundColor: productAvailable ? "#fff" : "#ccc",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-start",
                  alignItems: "stretch",
                  transition: "transform 0.2s ease",
                }}
              >
                {/* ✅ Link to product details */}
                <Link
                  to={`/product/${id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <img
                    src={imageUrl || unplugged}
                    alt={name}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      padding: "5px",
                      borderRadius: "10px 10px 0 0",
                    }}
                  />
                  <div
                    className="card-body"
                    style={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      padding: "10px",
                    }}
                  >
                    <div>
                      <h5
                        className="card-title"
                        style={{
                          margin: "0 0 10px 0",
                          fontSize: "1.2rem",
                        }}
                      >
                        {name.toUpperCase()}
                      </h5>
                      <i
                        className="card-brand"
                        style={{
                          fontStyle: "italic",
                          fontSize: "0.8rem",
                        }}
                      >
                        {"~ " + brand}
                      </i>
                    </div>
                    <hr className="hr-line" style={{ margin: "10px 0" }} />
                    <div className="home-cart-price">
                      <h5
                        className="card-text"
                        style={{
                          fontWeight: "600",
                          fontSize: "1.1rem",
                          marginBottom: "5px",
                        }}
                      >
                        ₹{price}
                      </h5>
                    </div>
                    {/* ✅ Add to Cart Button */}
                    <button
                      className="btn-hover color-9"
                      style={{
                        margin: "10px 25px 0px",
                        cursor: productAvailable ? "pointer" : "not-allowed",
                        backgroundColor: productAvailable
                          ? "#28a745"
                          : "#ccc",
                        color: productAvailable ? "#fff" : "#666",
                        borderRadius: "8px",
                        padding: "8px",
                        fontSize: "16px",
                        fontWeight: "500",
                      }}
                      onClick={(e) => {
                        e.preventDefault();
                        if (productAvailable) addToCart(product);
                      }}
                      disabled={!productAvailable}
                    >
                      {productAvailable ? "Add to Cart" : "Out of Stock"}
                    </button>
                  </div>
                </Link>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Home;
