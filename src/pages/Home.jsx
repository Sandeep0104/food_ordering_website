import React from "react";
import { FaShoppingCart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import mainpic from "../assets/bg-food.png";
import { products } from "../data";

const Home = () => {
  const featuredItems = products.slice(4, 7);

  return (
    <div className="bg-[#FAF3E0] py-10 lg:py-14">
      <div className="max-w-screen-xl mx-auto px-4 md:px-8 lg:px-12">
        {/* Hero Section */}
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10 lg:gap-16">
          {/* Text Content */}
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#E76F51] leading-tight">
              Discover <span className="text-[#2A9D8F]">Flavors</span> That Delight Your Senses
            </h1>
            <p className="text-[#264653] text-base md:text-lg max-w-xl mx-auto lg:mx-0">
              Dive into a world of mouth-watering dishes from across Asia. From sizzling street food to elegant traditional meals — we serve everything fresh, flavorful, and fast.
            </p>
            <div className="flex justify-center lg:justify-start">
              <NavLink to="/menu">
                <button className="bg-[#E76F51] hover:bg-[#F4A261] text-white px-5 py-2.5 rounded-full font-semibold shadow-md transition-all duration-300 flex items-center gap-2">
                  Explore Our Menu <FaShoppingCart className="text-lg" />
                </button>
              </NavLink>
            </div>
          </div>

          {/* Image */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <img
              src={mainpic}
              alt="Delicious Food"
              loading="lazy"
              className="w-[300px] sm:w-[360px] md:w-[400px] lg:w-[440px] rounded-full shadow-2xl object-cover border-4 border-white"
            />
          </div>
        </div>

        {/* Featured Dishes */}
        <div className="mt-14">
          <h2 className="text-2xl font-bold text-center text-[#E76F51] mb-6">Featured Dishes</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {featuredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl shadow-sm p-4 hover:shadow-lg transition-all"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  loading="lazy"
                  className="rounded-full w-28 h-28 object-cover mx-auto mb-3"
                />
                <h3 className="text-center text-lg font-semibold text-gray-800">{item.name}</h3>
                <p className="text-center text-gray-500 text-sm mb-1">
                  {item.description || "Delicious food item"}
                </p>
                <p className="text-center text-[#2A9D8F] font-bold text-base">
                  ₹{item.price.toFixed(2)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
