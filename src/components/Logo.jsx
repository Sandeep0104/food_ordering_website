import React from "react";
import { FaUtensils } from "react-icons/fa";

const Logo = () => {
  return (
    <div className="flex items-center gap-3 text-[1.8rem] font-extrabold tracking-tight cursor-pointer transition-transform duration-300 hover:scale-105">
      <FaUtensils className="text-[#ec7c7c] text-[2.2rem]" />
      <span className="text-[#2A9D8F] leading-tight">
        <span className="text-[#E76F51]">Fresh</span>
        <span className="ml-1">Bite</span>
      </span>
    </div>
  );
};

export default Logo;
