import { toast } from "react-hot-toast";
import { add, remove, decreaseQty } from "../redux/Slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const Product = ({ product }) => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(add(product));
    toast.success("Item added to cart");
  };

  const removeFromCart = () => {
    dispatch(decreaseQty(product.id));
    toast.error("Item quantity decreased");
  };

  const cartItem = cart.find((p) => p.id === product.id);
  const qty = cartItem ? cartItem.qty : 0;

  return (
    <div className="flex flex-col items-center justify-between bg-[#fff7eb] rounded-2xl shadow-md p-4 hover:scale-105 transition-transform duration-300 ease-in-out">
      {/* Product Image */}
      <div className="h-48 w-full overflow-hidden rounded-xl bg-[#ffeacc]">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="object-cover h-full w-full rounded-md justify-between"
        />
      </div>

      {/* Product Title */}
      <h2 className="text-lg font-semibold text-[#ff7b54] mt-4 text-center truncate w-full">
        {product.title}
      </h2>

      {/* Description */}
      <p className="text-sm text-gray-600 text-center mt-2">
        {product.description.split(" ").slice(0, 12).join(" ") + "..."}
      </p>

      {/* Price and Action Button */}
      <div className="flex items-center justify-between w-full mt-4">
        <span className="text-[#4caf50] font-semibold text-base">
          ₹{product.price}
        </span>
        {cartItem ? (
          <div className="flex items-center gap-2">
            <button
              onClick={removeFromCart}
              className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm hover:bg-red-200 transition"
            >
              -
            </button>
            <span className="font-semibold text-gray-700">{qty}</span>
            <button
              onClick={addToCart}
              className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm hover:bg-green-200 transition"
            >
              +
            </button>
          </div>
        ) : (
          <button
            onClick={addToCart}
            className="bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm hover:bg-green-200 transition"
          >
            Add
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
