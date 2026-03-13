import {NavLink, Outlet } from "react-router-dom";
import "../styles/navbar.css";
import React from "react";
const MainLayout = () => {
  return (
    <>
      <nav className="navbar">
        <div className="logo">Clean Service</div>
        <div className="links">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/login">Login</NavLink>
        <NavLink to="/booking">Booking</NavLink>
        </div>
      </nav>

      <main className="container">
        <Outlet />
      </main>
    </>
  );
};
export default MainLayout;