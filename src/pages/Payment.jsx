import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Payment = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    method: "cod", // default: Cash on Delivery
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.name || !formData.address || !formData.phone) {
      toast.error("Please fill in all fields");
      return;
    }

    toast.success("Payment successful!");
    navigate("/success", { state: { customer: formData.name } });
  };

  return (
    <div className="min-h-screen bg-[#FFF8F0] flex items-center justify-center px-4 py-10">
      <div className="max-w-xl w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-[#E76F51] mb-6 text-center">Payment Details</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block mb-1 text-sm text-gray-600">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter Your Name"
              className="w-full border px-4 py-2 rounded-md text-black"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label className="block mb-1 text-sm text-gray-600">Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Enter full address"
              rows="3"
              className="w-full border px-4 py-2 rounded-md text-black"
              required
            ></textarea>
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 text-sm text-gray-600">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter Your Number"
              className="w-full border px-4 py-2 rounded-md text-black"
              required
            />
          </div>

          {/* Payment Method */}
          <div>
            <label className="block mb-1 text-sm text-gray-600">Payment Method</label>
            <select
              name="method"
              value={formData.method}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded-md text-black"
            >
              <option value="cod">Cash on Delivery</option>
              <option value="upi">UPI</option>
              <option value="card">Debit/Credit Card</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-[#E76F51] hover:bg-[#d55b3d] text-white font-semibold py-2 rounded-md transition"
          >
            Confirm Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;
