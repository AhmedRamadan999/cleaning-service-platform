import React from "react";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import "../styles/admin.css";
import { useAuth } from "../context/AuthContext";
const AdminLayout = () => {
  const { token, role, logout } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }
  if (role !== "admin") {
    return <Navigate to="/" />;
  }
  return (
    <div className="admin-layout admin-page">
      <div className="admin-sidebar">
        <h2>Admin Panel</h2>
        <NavLink to="/admin">Dashboard</NavLink>
        <NavLink to="/admin/bookings">Bookings</NavLink>
        <NavLink to="/admin/services">Services</NavLink>
        <button onClick={logout} className="logout">Logout</button>
      </div>

      <div className="admin-content">
        <h1>Admin</h1>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
