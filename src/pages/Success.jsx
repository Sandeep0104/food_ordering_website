import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../redux/Slices/cartSlice";

const Success = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const name = location.state?.customer || "Customer";

  useEffect(() => {
    // Clear the cart when this page loads
    dispatch(clearCart());
  }, [dispatch]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAF3E0]">
      <div className="text-center space-y-6 px-4">
        <h2 className="text-4xl font-bold text-[#2E8B57]">Thank You, {name}!</h2>
        <p className="text-gray-600 text-lg">
          Your payment was successful. Your food will arrive soon!
        </p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-[#2E8B57] hover:bg-[#246b45] text-white px-6 py-3 rounded-lg font-semibold shadow-md transition"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default Success;
