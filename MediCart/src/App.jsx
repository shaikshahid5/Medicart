import { Routes, Route, Navigate } from "react-router-dom";

/* Layouts */
import General from "./components/layout/General.jsx";
import ClientDashboard from "./components/layout/ClientDashboard.jsx";

/* Pages */
import Login from "./components/pages/Login.jsx";
import Register from "./components/pages/Register.jsx";
import ForgotPassword from "./components/pages/ForgotPassword.jsx";
import Changepassword from "./components/pages/Changepassword.jsx";
import Accounts from "./components/pages/Accounts.jsx";
import Prescription from "./components/pages/Prescription.jsx";
import Orders from "./components/pages/Orders.jsx";
import HomePage from "./features/catalog/HomePage";
import AdminLayout from "./features/admin/AdminLayout";
import AdminProductsPage from "./features/admin/AdminProductsPage";
import AdminBatchPage from "./features/admin/AdminBatchPage";
import AdminLoginPage from "./features/admin/AdminLoginPage";
import MediCartModule4 from "./features/payment/MediCartModule4";
import AddressPage from "./features/delivery/AddressPage";
import MyOrdersPage from "./order/MyOrdersPage";
import OrderDetailsPage from "./order/OrderDetailsPage";
import ClientCart from "./components/pages/ClientCart.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<General />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="change-password" element={<Changepassword />} />
      </Route>

      <Route path="dashboard/client" element={<ClientDashboard />}>
        <Route path="account" element={<Accounts />} />
        <Route path="prescription" element={<Prescription />} />
        <Route path="orders" element={<Orders />} />
        <Route path="cart" element={<ClientCart />} />
        <Route path="*" element={<h1 className="text-center mt-5">Path not defined</h1>} />
      </Route>

      {/* CUSTOMER */}
      <Route path="/" element={<HomePage />} />
      <Route path="/address" element={<AddressPage />} />

      <Route path="/orders" element={<MyOrdersPage />} />
      <Route path="/orders/:orderId" element={<OrderDetailsPage />} />

      {/* ADMIN LOGIN */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/payment" element={<MediCartModule4 />} />


      {/* ADMIN PROTECTED ROUTES */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="products" />} />
        <Route path="products" element={<AdminProductsPage />} />
        <Route path="batches" element={<AdminBatchPage />} />

      </Route>

      <Route path="*" element={<h1 className="text-center mt-5">404 Not Found</h1>} />
    </Routes>
  );
};

export default App;
