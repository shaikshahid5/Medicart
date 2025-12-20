import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./features/catalog/HomePage";
import AdminLayout from "./features/admin/AdminLayout";
import AdminProductsPage from "./features/admin/AdminProductsPage";
import AdminLoginPage from "./features/admin/AdminLoginPage";

export default function App() {
  return (
    <Routes>
      {/* CUSTOMER */}
      <Route path="/" element={<HomePage />} />

      {/* ADMIN LOGIN */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* ADMIN PROTECTED */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="products" />} />
        <Route path="products" element={<AdminProductsPage />} />
        {/* <Route path="batches" element={<AdminBatchPage />} /> */}
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
