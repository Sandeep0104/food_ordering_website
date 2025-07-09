import { useEffect, useState } from "react";
import Spinner from "../components/Spinner";
import Product from "../components/Product";
import { products as productData } from "../data";

const Menu = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    setLoading(true);
    setProducts(productData);
    setLoading(false);
  }, []);

  const categories = ["All", ...new Set(productData.map(item => item.category))];

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter(product => product.category === selectedCategory);

  return (
    <div className="bg-[#FAF3E0] min-h-screen px-4 py-10">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-[#E76F51] mb-8">
          Explore Our Delicious Menu
        </h1>

        {/* Category Buttons */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-10">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm sm:text-base font-medium transition 
                ${
                  selectedCategory === category
                    ? "bg-[#E76F51] text-white"
                    : "bg-white text-[#E76F51] border border-[#E76F51]"
                }
                hover:bg-[#E76F51] hover:text-white`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        {loading ? (
          <Spinner />
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <Product key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center text-[#264653] text-lg">
            No food items available for this category.
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
