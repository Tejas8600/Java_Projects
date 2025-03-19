import React, { useContext, useState, useEffect } from "react";
import AppContext from "../Context/Context";
import axios from "axios";
import CheckoutPopup from "./CheckoutPopup";
import { Button } from 'react-bootstrap';

console.log('Cart component is rendering...');  //Debugging
const Cart = () => {
  const { cart, removeFromCart, clearCart } = useContext(AppContext);
  console.log('Cart from context:', cart);  //Debugging
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // console.log('Token:', token); //Debugging
  // console.log('Role:', role);   //Debugging

  useEffect(() => {
    const role = localStorage.getItem('role');
    const token = localStorage.getItem('token');
    console.log('Token in useEffect:', token);
    console.log('Checking token and role in useEffect...');
    if (token && role === 'User') {
      console.log('Fetching cart...');  //Debugging
      fetchCartItems();
    }
  }, [cart, token, role]);

  const fetchCartItems = async () => {
    try {
      console.log('Fetching cart items...');  //Debugging
      const response = await axios.get('http://localhost:8080/api/cart', {
        headers: {
          'Authorization': `Bearer ${token}` // ✅ Pass token here
        }
      });
      console.log('Cart Items:', response.data);
      setCartItems(response.data);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  useEffect(() => {
    console.log("Cart state updated:", cartItems); // Debugging
    const total = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [cartItems]);

  const handleIncreaseQuantity = (itemId) => {
    setCartItems(cartItems.map(item =>
      item.id === itemId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    ));
  };

  const handleDecreaseQuantity = (itemId) => {
    setCartItems(cartItems.map(item =>
      item.id === itemId
        ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
        : item
    ));
  };

  const handleRemoveFromCart = (itemId) => {
    removeFromCart(itemId);
    setCartItems(cartItems.filter(item => item.id !== itemId));
  };

  const handleCheckout = async () => {
    try {
      for (const item of cartItems) {
        const { imageUrl, ...rest } = item;

        await axios.put(
          `http://localhost:8080/api/product/${item.id}`,
          { ...rest },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // ✅ Ensure token is passed here
            },
          }
        );
      }
      clearCart();
      setCartItems([]);
      setShowModal(false);
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  if (!token || role !== 'User') {
    return <p>Please login to view your cart.</p>;
  }

  return (
    <div className="cart-container">
      <div className="shopping-cart">
        <div className="title">Shopping Bag</div>
        {cartItems.length === 0 ? (
          <div className="empty">
            <h4>Your cart is empty</h4>
          </div>
        ) : (
          <>
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                <div className="description">
                  <span>{item.brand}</span>
                  <span>{item.name}</span>
                </div>
                <div className="quantity">
                  <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
                </div>
                <div className="total-price">${item.price * item.quantity}</div>
                <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
              </div>
            ))}
            <div className="total">Total: ${totalPrice}</div>
            <Button onClick={() => setShowModal(true)}>Checkout</Button>
          </>
        )}
      </div>
      <CheckoutPopup
        show={showModal}
        handleClose={() => setShowModal(false)}
        cartItems={cartItems}
        totalPrice={totalPrice}
        handleCheckout={handleCheckout}
      />
    </div>
  );
};

export default Cart;


// import React, { useContext, useState, useEffect } from "react";
// import AppContext from "../Context/Context";
// import axios from "axios";
// import CheckoutPopup from "./CheckoutPopup";
// import { Button } from 'react-bootstrap';

// const Cart = () => {
//   const { cart, removeFromCart, clearCart } = useContext(AppContext);
//   const [cartItems, setCartItems] = useState([]);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [showModal, setShowModal] = useState(false);
//   const role = localStorage.getItem('role');
//   const token = localStorage.getItem('token');

//   useEffect(() => {
//     if (token && role === 'User') {
//       fetchCartItems();
//     }
//   }, [cart, token, role]);

//   const fetchCartItems = async () => {
//     try {
//       const response = await axios.get("http://localhost:8080/api/products");
//       const backendProductIds = response.data.map((product) => product.id);

//       const updatedCartItems = cart.filter((item) => backendProductIds.includes(item.id));
//       const cartItemsWithImages = await Promise.all(
//         updatedCartItems.map(async (item) => {
//           try {
//             const imageResponse = await axios.get(
//               `http://localhost:8080/api/product/${item.id}/image`,
//               { responseType: "blob" }
//             );
//             const imageUrl = URL.createObjectURL(imageResponse.data);
//             return { ...item, imageUrl };
//           } catch (error) {
//             console.error("Error fetching image:", error);
//             return { ...item, imageUrl: "placeholder-image-url" };
//           }
//         })
//       );
//       setCartItems(cartItemsWithImages);
//     } catch (error) {
//       console.error("Error fetching product data:", error);
//     }
//   };

//   useEffect(() => {
//     const total = cartItems.reduce(
//       (acc, item) => acc + item.price * item.quantity,
//       0
//     );
//     setTotalPrice(total);
//   }, [cartItems]);

//   const handleIncreaseQuantity = (itemId) => {
//     setCartItems(cartItems.map(item =>
//       item.id === itemId
//         ? { ...item, quantity: item.quantity + 1 }
//         : item
//     ));
//   };

//   const handleDecreaseQuantity = (itemId) => {
//     setCartItems(cartItems.map(item =>
//       item.id === itemId
//         ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
//         : item
//     ));
//   };

//   const handleRemoveFromCart = (itemId) => {
//     removeFromCart(itemId);
//     setCartItems(cartItems.filter(item => item.id !== itemId));
//   };

//   const handleCheckout = async () => {
//     try {
//       for (const item of cartItems) {
//         const { imageUrl, ...rest } = item;

//         await axios.put(
//           `http://localhost:8080/api/product/${item.id}`,
//           { ...rest },
//           {
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//       }
//       clearCart();
//       setCartItems([]);
//       setShowModal(false);
//     } catch (error) {
//       console.error("Error during checkout:", error);
//     }
//   };

//   if (!token || role !== 'User') {
//     return <p>Please login to view your cart.</p>;
//   }

//   return (
//     <div className="cart-container">
//       <div className="shopping-cart">
//         <div className="title">Shopping Bag</div>
//         {cartItems.length === 0 ? (
//           <div className="empty">
//             <h4>Your cart is empty</h4>
//           </div>
//         ) : (
//           <>
//             {cartItems.map((item) => (
//               <div key={item.id} className="cart-item">
//                 <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
//                 <div className="description">
//                   <span>{item.brand}</span>
//                   <span>{item.name}</span>
//                 </div>
//                 <div className="quantity">
//                   <button onClick={() => handleIncreaseQuantity(item.id)}>+</button>
//                   <span>{item.quantity}</span>
//                   <button onClick={() => handleDecreaseQuantity(item.id)}>-</button>
//                 </div>
//                 <div className="total-price">${item.price * item.quantity}</div>
//                 <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
//               </div>
//             ))}
//             <div className="total">Total: ${totalPrice}</div>
//             <Button onClick={() => setShowModal(true)}>Checkout</Button>
//           </>
//         )}
//       </div>
//       <CheckoutPopup
//         show={showModal}
//         handleClose={() => setShowModal(false)}
//         cartItems={cartItems}
//         totalPrice={totalPrice}
//         handleCheckout={handleCheckout}
//       />
//     </div>
//   );
// };

// export default Cart;