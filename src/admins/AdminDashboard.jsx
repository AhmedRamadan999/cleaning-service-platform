import React from "react";
import "../styles/admin.css";

const AdminDashboard = () => {
  return (
    <>
      <h2>Dashboard</h2>
      <div className="admin-services-grid">
        <div className="service-card">
          <h3>Welcome Admin</h3>
          <p>You are now inside the admin dashboard.</p>
        </div>

        <div className="admin-service-card">
          <h3>Bookings</h3>
          <p>Manage customer bookings from the bookings page.</p>
        </div>

        <div className="admin-service-card">
          <h3>Services</h3>
          <p>Manage cleaning services from the services page.</p>
        </div>
      </div>
    </>
  );
};

export default AdminDashboard;
