import Navbar from "./components/NavBar";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import Contact from "./pages/ContactUs";
import Payment from "./pages/Payment";
import Success from "./pages/Success";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return(
    <div>
      <div className="bg-slate-900">
      <Navbar />
      </div>
      <div className="pt-20 bg-slate-900 min-h-screen">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/menu" element={<Menu />}/>
          <Route path="/cart" element={<Cart />}/>
          <Route path="/contact" element={<Contact />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/success" element={<Success />} />
      </Routes>
      </div>
    </div>
  )
};

export default App;
