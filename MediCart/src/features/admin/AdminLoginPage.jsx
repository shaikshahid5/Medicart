import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "./adminAuth";
import "./admin.css";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const success = loginAdmin(username, password);
    if (!success) {
      setError("Invalid admin credentials");
      return;
    }

    navigate("/admin/products");
  };

  return (
    <div className="admin-login-page">
      <form className="admin-login-box" onSubmit={handleLogin}>
        <h2 className="admin-logo">MediCart</h2>
        <p className="admin-sub">Admin Panel</p>

        {error && <p className="error">{error}</p>}

        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" className="btn-primary">
          Login
        </button>

   
      </form>
    </div>
  );
}
