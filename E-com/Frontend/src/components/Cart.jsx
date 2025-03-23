

import React, { useContext } from "react";
import AppContext from "../Context/Context";

const Cart = () => {
  const { cart, removeFromCart, addToCart } = useContext(AppContext);

  // ✅ Calculate Total Price
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // ✅ Handle Quantity Change
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      addToCart({ id: productId, quantity: newQuantity });
    }
  };

  if (cart.length === 0) {
    return (
      <div className="container mt-5">
        <h2 className="text-center text-muted">🛒 Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div
      className="container"
      style={{
        paddingTop: "80px", // ✅ Fixed overlap with navbar
        display: "flex",
        flexDirection: "column", // ✅ Ensure vertical alignment
        alignItems: "center",
        gap: "24px", // ✅ Space between cart and total section
        maxWidth: "1200px", // ✅ Limit width to avoid overflow
        margin: "0 auto", // ✅ Center the container
      }}
    >
      <h2 className="mb-4 fw-bold text-center">🛒 Your Cart</h2>

      {/* ✅ Cart Items */}
      <div
        className="cart-items"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))", // ✅ Adjust card size
          gap: "16px",
          maxHeight: "600px",
          overflowY: "auto", // ✅ Allow vertical scroll
          width: "100%",
          padding: "0 16px", // ✅ Remove side black space
        }}
      >
        {cart.map((product) => (
          <div
            key={product.id}
            className="card shadow"
            style={{
              borderRadius: "12px",
              overflow: "hidden",
              backgroundColor: "#ffffff",
              transition: "transform 0.2s ease-in-out",
              width: "100%", // ✅ Ensure uniform width
              height: "420px", // ✅ Fixed card height
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            }}
          >
            {/* ✅ Product Image */}
            <img
              src={product.imageUrl || "https://via.placeholder.com/150"}
              alt={product.name}
              className="card-img-top"
              style={{
                width: "100%",
                height: "160px",
                objectFit: "cover",
                borderBottom: "1px solid #f0f0f0",
              }}
            />

            {/* ✅ Product Details */}
            <div className="card-body" style={{ padding: "12px" }}>
              <h5
                className="card-title fw-bold"
                style={{
                  fontSize: "1rem",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {product.name.toUpperCase()}
              </h5>
              <p
                className="card-text text-muted"
                style={{
                  fontSize: "0.85rem",
                  marginBottom: "8px",
                }}
              >
                ₹{product.price} | Brand: {product.brand}
              </p>

              {/* ✅ Quantity & Remove Controls */}
              <div
                className="d-flex align-items-center justify-content-between"
                style={{
                  gap: "8px",
                }}
              >
                {/* ✅ Quantity Controls */}
                <div
                  className="d-flex align-items-center"
                  style={{
                    gap: "6px",
                  }}
                >
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() =>
                      handleQuantityChange(product.id, product.quantity - 1)
                    }
                    disabled={product.quantity <= 1}
                    style={{
                      minWidth: "36px",
                      padding: "4px 6px",
                      fontSize: "14px",
                      borderRadius: "6px",
                    }}
                  >
                    −
                  </button>

                  <span
                    style={{
                      width: "40px",
                      height: "32px",
                      fontSize: "14px",
                      fontWeight: "bold",
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      backgroundColor: "#f8f8f8",
                    }}
                  >
                    {product.quantity}
                  </span>

                  <button
                    className="btn btn-outline-secondary"
                    onClick={() =>
                      handleQuantityChange(product.id, product.quantity + 1)
                    }
                    style={{
                      minWidth: "36px",
                      padding: "4px 6px",
                      fontSize: "14px",
                      borderRadius: "6px",
                    }}
                  >
                    +
                  </button>
                </div>

                {/* ✅ Remove Button */}
                <button
                  className="btn btn-outline-danger"
                  onClick={() => removeFromCart(product.id)}
                  style={{
                    fontSize: "14px",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontWeight: "bold",
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✅ Total Price Section */}
      <div
        className="total-price-section mt-4"
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          textAlign: "center",
          margin: "0 auto", // ✅ Center align total price section
        }}
      >
        <h4
          className="fw-bold"
          style={{
            color: "#333", // ✅ Dark gray for better contrast
            fontSize: "1.5rem",
            marginBottom: "12px",
          }}
        >
          Total: ₹<span>{calculateTotal()}</span>
        </h4>

        <button
          className="btn btn-success mt-2 px-4 py-2"
          style={{
            fontSize: "16px",
            fontWeight: "bold",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
            width: "100%",
            maxWidth: "250px",
          }}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;