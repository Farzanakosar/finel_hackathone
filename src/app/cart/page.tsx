"use client";
import React, { useEffect, useState } from "react";
import { getCartItems, removeFromCart, updateCartQuantity } from "../action/actions";
import { Car } from "@/types/car";
import Swal from "sweetalert2";
import {  sanityUserPost } from "@/servicestwo/userApi";

const CartPage = () => {
  useEffect(() => {
    sanityUserPost();

  }, []);


  const [cartItems, setCartItems] = useState<Car[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Cart items fetch karna
  useEffect(() => {
    // Simulate fetching items with a delay
    const fetchItems = () => {
      const items = getCartItems(); // Get items from local storage or API
      console.log("Fetched Cart Items: ", items); // Debugging line
      setCartItems(items);
      setLoading(false); // Stop loading once data is fetched
    };
    
    fetchItems(); // Fetch items when the component mounts
  }, []);

  // Remove from cart function
  const handleRemoveFromCart = (productId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        removeFromCart(productId);
        setCartItems(getCartItems());
        Swal.fire("Deleted!", "Your item has been deleted.", "success");
      }
    });
  };

  // Increment quantity
  const handleIncrement = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === productId
          ? { ...item, quantity: (item.quantity || 0) + 1 }
          : item
      )
    );
    const product = cartItems.find((item) => item._id === productId);
    if (product) updateCartQuantity(productId, (product.quantity || 0) + 1);
  };

  // Decrement quantity
  const handleDecrement = (productId: string) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === productId && item.quantity > 1
          ? { ...item, quantity: (item.quantity || 1) - 1 }
          : item
      )
    );
    const product = cartItems.find((item) => item._id === productId);
    if (product && product.quantity > 1) updateCartQuantity(productId, (product.quantity || 1) - 1);
  };

  // Total calculate karna
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = isNaN(item.pricePerDay) ? 0 : item.pricePerDay;
      const quantity = isNaN(item.quantity) ? 0 : item.quantity;
      return total + price * quantity;
    }, 0);
  };

  // Proceed to checkout
  const handleProceed = () => {
    Swal.fire({
      title: "Proceed to checkout?",
      text: "Please review your cart before checkout",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, proceed!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Success", "Checkout successful", "success");
        setCartItems([]);
      }
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-5">
      <h1 className="text-2xl font-bold text-center mb-6">Your Shopping Cart</h1>

      {/* Show loading spinner while fetching items */}
      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty!</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg"
              key={item._id}
            >
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-gray-600">Price per Day: ${item.pricePerDay}</p>
                <div className="flex items-center mt-2">
                  <button
                    onClick={() => handleDecrement(item._id)}
                    className="bg-gray-200 p-2 rounded-l"
                  >
                    -
                  </button>
                  <span className="px-4">{item.quantity || 0}</span>
                  <button
                    onClick={() => handleIncrement(item._id)}
                    className="bg-gray-200 p-2 rounded-r"
                  >
                    +
                  </button>
                  <button
                    className="ml-4 text-red-500"
                    onClick={() => handleRemoveFromCart(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
          <h3 className="text-xl font-bold">Total: ${calculateTotal().toFixed(2)}</h3>
          <button
            onClick={handleProceed}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default CartPage;














// "use client";
// import React, { useEffect, useState } from 'react';
// import { getCartItems, removeFromCart, updateCartQuantity } from '../action/actions';
// import { Car } from '@/types/car';
// import Swal from 'sweetalert2';

// const CartPage = () => {
//   const [cartItems, setCartItems] = useState<Car[]>([]);

//   useEffect(() => {
//     setCartItems(getCartItems());
//   }, []);

//   const handleRemoveFromCart = (productId: string) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       icon: 'warning',
//       showCancelButton: true,
//       confirmButtonColor: '#3085d6',
//       cancelButtonColor: '#d33',
//       confirmButtonText: 'Yes, delete it!'
//     }).then((result) => {
//       if (result.isConfirmed) {
//         removeFromCart(productId);
//         setCartItems(getCartItems());
//         Swal.fire('Deleted!', 'Your item has been deleted.', 'success');
//       }
//     });
//   };

//   const handleQuantityChange = (productId: string, quantity: number) => {
//     updateCartQuantity(productId, quantity);
//     setCartItems(getCartItems());
//   };

//   const handleIncrement = (productId: string) => {
//     const product = cartItems.find((item) => item._id === productId);
//     if (product) handleQuantityChange(productId, product.quantity + 1);
//   };

//   const handleDecrement = (productId: string) => {
//     const product = cartItems.find((item) => item._id === productId);
//     if (product && product.quantity > 1) handleQuantityChange(productId, product.quantity - 1);
//   };

//   const calculateTotal = () => {
//     return cartItems.reduce((total, item) => total + item.pricePerDay * item.quantity, 0);
//   };

//   const handleProceed = () => {
//     Swal.fire({
//       title: "Proceed to checkout?",
//       text: "Please review your cart before checkout",
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, proceed!",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         Swal.fire("Success", "Checkout successful", "success");
//         setCartItems([]);
//       }
//     });
//   };

//   return (
//     <div className="max-w-3xl mx-auto p-5">
//       <h1 className="text-2xl font-bold text-center mb-6">Your Shopping Cart</h1>
//       {cartItems.length === 0 ? (
//         <p className="text-center text-gray-500">Your cart is empty!</p>
//       ) : (
//         <div className="space-y-4">
//           {cartItems.map((item) => (
//             <div className="flex justify-between items-center bg-white shadow-md p-4 rounded-lg" key={item._id}>
//               <div className="flex-1">
//                 <h2 className="text-lg font-semibold">{item.name}</h2>
//                 <p className="text-gray-600">Price per Day: ${item.pricePerDay}</p>
//                 <div className="flex items-center mt-2">
//                   <button onClick={() => handleDecrement(item._id)} className="bg-gray-200 p-2 rounded-l">-</button>
//                   <span className="px-4">{item.quantity}</span>
//                   <button onClick={() => handleIncrement(item._id)} className="bg-gray-200 p-2 rounded-r">+</button>
//                   <button className="ml-4 text-red-500" onClick={() => handleRemoveFromCart(item._id)}>Remove</button>
//                 </div>
//               </div>
//             </div>
//           ))}
//           <h3 className="text-xl font-bold">Total: ${calculateTotal().toFixed(2)}</h3>
//           <button onClick={handleProceed} className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-500 transition">Proceed to Checkout</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CartPage;


















// "use client"
// import React, { useEffect, useState } from 'react'
// import { getCartItems, removeFromCart, updateCartQuantity } from '../action/actions';
// import { Car } from '@/types/car';
// import Swal from 'sweetalert2';


// const CartPage = () => {
// const [cartItems, setCartItems] = useState<Car[]>([]);

// useEffect(() => {
//     setCartItems(getCartItems());
// }, [])

// const hendleRemoveFromCart = (productId: string) => {
//     Swal.fire({
//         title: 'Are you sure?',
//         text: "You won't be able to revert this!",
//         icon: 'warning',
//         showCancelButton: true,
//         confirmButtonColor: '#3085d6',
//         cancelButtonColor: '#d33',
//         confirmButtonText: 'Yes, delete it!'
//       }).then((result) => {
//         if (result.isConfirmed) {
//             removeFromCart(productId);
//             setCartItems(getCartItems())
//             Swal.fire(
//                 'Deleted!',
//                 'Your file has been deleted.',
//                 'success'
//               )
//         }
        
//     })
// }

// const handleQuantityChange = (productId: string, quantity: number) => {
//     updateCartQuantity(productId, quantity);
//     setCartItems(getCartItems());
// }

// const handleIncrement = (productId: string) => {
//     const product = cartItems.find((item) => item._id === productId)
//     if(product)
//         handleQuantityChange(productId, product.pricePerDay + 1);

// }

// const handleDecrement = (productId: string) => {
//     const product = cartItems.find((item) => item._id === productId)
//     if(product && product.pricePerDay > 1)
//         handleQuantityChange(productId, product.pricePerDay - 1);

// }

// const calcluateTotal = () => {
//     return cartItems.reduce((total, item) => total + item.pricePerDay * item.pricePerDay1, 0);
// }

// const handleProceed=() => {
//     Swal.fire({
//         title: "Proceed to checkout?",
//         text: "please review your cart before checkout",
//         icon: "question",
//         showCancelButton: true,
//         confirmButtonColor: "#3085d6",
//         cancelButtonColor: "#d33",
//         confirmButtonText: "Yes, proceed!",
//     }).then((result) => {
//         if (result.isConfirmed) {
//          Swal.fire("Success", "Checkout successful", "success");
//          setCartItems([]);
//         }
//     })
// }

//   return (
//     <div>
        
//     </div>
//   )

// }
// export default CartPage;