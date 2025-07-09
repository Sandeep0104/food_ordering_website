import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

import CartItem from "../components/CartItem";

const Cart = () => {
  const { cart } = useSelector((state) => state);
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    setAmount(cart.reduce((acc, curr) => acc + curr.price, 0));
  }, [cart]);

  const handleCheckout = () => {
    if (cart.length === 0) return;
    navigate("/payment");
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] px-4 py-10">
      {cart.length > 0 ? (
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-[60%] w-full space-y-4">
            {cart.map((cartItem, index) => (
              <CartItem item={cartItem} key={cartItem.id} itemIndex={index} />
            ))}
          </div>

          {/* Summary */}
          <div className="lg:w-[40%] w-full bg-white rounded-xl shadow-xl p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[#2E8B57] mb-2">Summary</h2>
              <p className="text-gray-700 font-medium">
                Total Items: <span className="text-black">{cart.length}</span>
              </p>
            </div>
            <div className="text-xl font-semibold mb-6">
              Total Amount: <span className="text-[#2E8B57]">₹{amount.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="bg-[#FFA500] hover:bg-[#ff8c00] text-white w-full py-3 rounded-lg font-semibold shadow-md transition"
            >
              Proceed to Payment
            </button>
          </div>
        </div>
      ) : (
        <div className="min-h-[80vh] flex flex-col justify-center items-center text-center">
          <h1 className="text-2xl text-gray-700 font-semibold mb-4">
            Your cart is empty!
          </h1>
          <NavLink to="/menu">
            <button className="bg-[#FFA500] hover:bg-[#ff8c00] text-white px-6 py-3 rounded-lg font-semibold shadow-md transition">
              Order Now
            </button>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Cart;
