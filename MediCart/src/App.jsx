import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./features/catalog/HomePage";
import AdminLayout from "./features/admin/AdminLayout";
import AdminProductsPage from "./features/admin/AdminProductsPage";
import AdminBatchPage from "./features/admin/AdminBatchPage";
import AdminLoginPage from "./features/admin/AdminLoginPage";
import Reports from "./features/admin/analyticsSecction/Reports";
import Dashboard from "./features/admin/analyticsSecction/dashboard";

export default function App() {
  return (
    <Routes>
      {/* CUSTOMER */}
      <Route path="/" element={<HomePage />} />
      

      {/* ADMIN LOGIN */}
      <Route path="/admin/login" element={<AdminLoginPage />} />

      {/* ADMIN PROTECTED ROUTES */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="products" />} />
        <Route path="products" element={<AdminProductsPage />} />
        <Route path="batches" element={<AdminBatchPage />} />
        <Route path="reports" element={<Reports/>}/>
        <Route path="dashboard" element={<Dashboard/>}/>
      </Route>

      {/* FALLBACK */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
