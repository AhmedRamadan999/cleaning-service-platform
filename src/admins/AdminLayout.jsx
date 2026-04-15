import React from "react";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import "../styles/admin.css";

const AdminLayout = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="admin-layout admin-page">
      <div className="admin-sidebar">
        <h2>Admin Panel</h2>
        <NavLink to="/admin/bookings">Bookings</NavLink>
        <NavLink to="/admin/services">Services</NavLink>
      </div>

      <div className="admin-content">
        <h1>Admin</h1>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
