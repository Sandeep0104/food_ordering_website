import React from "react";

const About = () => {
  return (
    <div className="bg-[#FFF8F0] min-h-screen px-6 py-16">
      <div className="max-w-5xl mx-auto text-center space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold text-[#E76F51]">
          About <span className="text-[#2A9D8F]">Us</span>
        </h1>

        <p className="text-[#264653] text-lg leading-relaxed">
          Welcome to FreshBite — your go-to destination for discovering and enjoying a wide range of delicious cuisines from the comfort of your home. Whether you're craving spicy street food, rich traditional meals, or light, healthy options, we bring it all to your fingertips.
        </p>

        <p className="text-[#264653] text-lg leading-relaxed">
          Our mission is simple: to make food ordering quick, convenient, and satisfying for everyone. Built with love using ReactJS, our platform offers a smooth user experience, real-time cart updates, and responsive design to work seamlessly across devices.
        </p>

        <p className="text-[#264653] text-lg leading-relaxed">
          From selecting your meal to placing your order, we have streamlined every step to ensure an enjoyable experience. We're constantly evolving to meet the needs of modern foodies — whether you’re a student, a professional, or just hungry at midnight.
        </p>

        <div className="mt-10">
          <h2 className="text-2xl font-semibold text-[#E76F51] mb-2">Why Choose Us?</h2>
          <ul className="text-left max-w-xl mx-auto text-[#264653] space-y-2 text-lg list-disc pl-6">
            <li>Fresh and high-quality meals from top-rated restaurants</li>
            <li>User-friendly interface with smooth navigation</li>
            <li>Secure and fast checkout experience</li>
            <li>Real-time order and cart updates</li>
            <li>Responsive design — works perfectly on all devices</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
