import { NavLink, Outlet } from "react-router-dom";
import "../styles/navbar.css";
import React from "react";
const MainLayout = () => {
  return (
    <>
      <nav-center className="navbar">
        <div className="logo">Clean Service</div>
        <div className="links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/booking">Booking</NavLink>
        </div>
        <div className="links">
          <nav-right>
            <NavLink to="/register">Register</NavLink>
            <NavLink to="/login">Login</NavLink>
          </nav-right>
        </div>
      </nav-center>

      <main className="container">
        <Outlet />
      </main>
    </>
  );
};
export default MainLayout;
