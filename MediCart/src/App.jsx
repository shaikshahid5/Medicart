import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./features/catalog/HomePage";
import AdminLayout from "./features/admin/AdminLayout";
import AdminProductsPage from "./features/admin/AdminProductsPage";
import AdminBatchPage from "./features/admin/AdminBatchPage";
import AdminLoginPage from "./features/admin/AdminLoginPage";
import AddressPage from "./features/delivery/AddressPage";
import MyOrdersPage from "./order/MyOrdersPage";
import OrderDetailsPage from "./order/OrderDetailsPage";
export default function App() {
  return (
    <Routes>
      {/* CUSTOMER */}
      <Route path="/" element={<HomePage />} />
      <Route path="/address" element={<AddressPage />} /> {/* 👈 new route */}

     <Route path="/orders" element={<MyOrdersPage />} />
        <Route path="/orders/:orderId" element={<OrderDetailsPage />} />

      {/* ADMIN LOGIN */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* ADMIN PROTECTED ROUTES */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="products" />} />
        <Route path="products" element={<AdminProductsPage />} />
        <Route path="batches" element={<AdminBatchPage />} />
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
