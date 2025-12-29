import { Outlet, NavLink, Navigate, useNavigate } from "react-router-dom";
import { isAdminAuthenticated, logoutAdmin } from "./adminAuth";
import "./admin.css";

export default function AdminLayout() {
  const navigate = useNavigate();

  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin/login" />;
  }

  const handleLogout = () => {
    logoutAdmin();
    navigate("/admin/login");
  };

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
        <h2 className="admin-logo">MediCart</h2>

        <nav>
          <NavLink to="/admin/products">Products</NavLink>
          <NavLink to="/admin/batches">Batches</NavLink>
          <NavLink to="/admin/dashboard">Dashboard</NavLink>
          <NavLink to="/admin/reports">Reports</NavLink> 
          
        </nav>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      {/* CONTENT */}
      <main className="admin-content">
        <Outlet />
      </main>
    </div>
  );
}
