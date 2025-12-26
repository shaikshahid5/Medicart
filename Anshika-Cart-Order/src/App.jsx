import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ShopPage from "./ShopPage.jsx";
import CartPage from "./CartPage.jsx";
import { CartProvider } from "./Content/CartContent.jsx";
import PatientDoctorPage from "./Content/PatientDoctorPage.jsx";
import OrderTrackingPage from "./OrderTrackingPage";
import OrderDetailsPage from "./OrderDetailsPage.jsx";

function App() {
  return (
    <CartProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ShopPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/Address" element={<PatientDoctorPage />} />
          <Route path="/track-order" element={<OrderTrackingPage />} />
          <Route path="/order/:orderId" element={<OrderDetailsPage />} />

        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
