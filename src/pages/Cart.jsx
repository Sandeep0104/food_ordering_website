import { NavLink, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { clearCart } from "../redux/Slices/cartSlice";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CartItem from "../components/CartItem";
import CheckoutForm from "../components/CheckoutForm";

// Make sure to replace with your public key
const stripePromise = loadStripe("pk_test_51RmyuyRXzoqjQQKKWnzbFM1eBnjUbdS7mw6hJPbdldtvUYApKeECvDw6VCzIyNt4NrDDJKXVj7KY74IQfmMGAbEp00Z5khylCW");

const API_URL = import.meta.env.VITE_API_URL || "";

const Cart = () => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [amount, setAmount] = useState(0);
  const [clientSecret, setClientSecret] = useState("");
  const [showCheckout, setShowCheckout] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAmount(cart.reduce((acc, curr) => acc + curr.price * curr.qty, 0));
  }, [cart]);

  const initiatePayment = async () => {
    if (cart.length === 0) return;

    try {
      console.log("Initiating payment...");
      const res = await fetch(`${API_URL}/api/payment/create-payment-intent`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: Math.round(amount * 100) }), // Amount in cents/paise
      });

      if (!res.ok) {
        throw new Error(`Server error: ${res.status}`);
      }

      const data = await res.json();
      console.log("Payment Intent Response:", data);

      if (data.error) {
        toast.error("Backend Error: " + data.error);
        return;
      }

      if (!data.clientSecret) {
        toast.error("Failed to get client secret. Check server logs.");
        return;
      }

      setClientSecret(data.clientSecret);
      setShowCheckout(true);
    } catch (error) {
      console.error("Error initiating payment:", error);
      toast.error("Failed to initiate payment: " + error.message);
    }
  };

  const handlePaymentSuccess = async (paymentIntent) => {
    toast.success("Payment Successful!");

    // Save Order to Backend
    try {
      console.log("Saving order to backend...");
      const orderData = {
        items: cart.map(item => ({
          id: item.id,
          name: item.title,
          price: item.price,
          qty: item.qty,
          img: item.image
        })),
        amount: amount,
      };

      const res = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Order Placed Successfully!");
      } else {
        toast.error("Failed: " + (data.message || "Unknown Error"));
        console.error("Failed to save order:", data.message);
      }
    } catch (error) {
      console.error("Error saving order:", error);
      toast.error("Error saving order: " + error.message);
    }

    setShowCheckout(false);
    dispatch(clearCart());
    navigate("/");
  };

  const options = {
    clientSecret,
    theme: 'stripe',
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] px-4 py-10 relative">
      {cart.length > 0 ? (
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-[60%] w-full space-y-4">
            {cart.map((cartItem, index) => (
              <CartItem item={cartItem} key={cartItem.id} itemIndex={index} />
            ))}
          </div>

          {/* Summary */}
          <div className="lg:w-[40%] w-full bg-white rounded-xl shadow-xl p-6 h-fit">
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
              onClick={initiatePayment}
              className="bg-[#FFA500] hover:bg-[#ff8c00] text-white w-full py-3 rounded-lg font-semibold shadow-md transition"
            >
              Checkout with Stripe
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

      {/* Stripe Modal Overlay */}
      {showCheckout && clientSecret && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-md relative">
            <button
              onClick={() => setShowCheckout(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-black font-bold text-xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-[#2E8B57]">Complete Payment</h2>
            <Elements stripe={stripePromise} options={options}>
              <CheckoutForm amount={amount} onSuccess={handlePaymentSuccess} />
            </Elements>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
