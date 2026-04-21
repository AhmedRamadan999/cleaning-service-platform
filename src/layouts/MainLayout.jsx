import "../styles/navbar.css";
import React from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";
const MainLayout = () => {
  const location = useLocation();
  const { token, role, logout } = useAuth();
  const navigate = useNavigate();
  const isAdminPage = location.pathname.startsWith("/admin");
  return (
    <>
      <nav-center className="navbar">
        <div className="logo">
          <img src={logo} alt="Clean Service Logo" className="logo-img" />
          Clean Service
        </div>{" "}
        <div className="links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/contact">Kontakt</NavLink>
          {/* <NavLink to="/booking">Booking</NavLink> */}
          <NavLink to="/about">About os</NavLink>
        </div>
        <div className="links">
          <nav-right>
            {!token ? (
              <>
                <NavLink to="/register">Register</NavLink>
                <NavLink to="/login">Login</NavLink>
              </>
            ) : (
              <>
                {role === "admin" && <NavLink to="/admin">Dashboard</NavLink>}
                <button
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="logout-btn"
                >
                  Logout
                </button>
              </>
            )}
          </nav-right>
        </div>
      </nav-center>

      <main className={isAdminPage ? "admin-main" : "container"}>
        <Outlet />
      </main>
      {!isAdminPage && (
        <footer className="footer">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Clean Service</h3>
              <p>Professional cleaning services for homes and offices.</p>
            </div>

            <div className="footer-section">
              <h4>Quick Links</h4>
              <p>
                <NavLink to="/">Home</NavLink>
              </p>
              <p>
                <NavLink to="/services">Services</NavLink>
              </p>
              <p>
                <NavLink to="/contact">Kontakt</NavLink>
              </p>
              <p>
                <NavLink to="/about">About os</NavLink>
              </p>
            </div>

            <div className="footer-section">
              <h4>Contact</h4>
              <p>Email: ar086974@gmail.com</p>
              <p>Phone: +49 01709870488</p>
            </div>
          </div>

          <p className="footer-copy">
            © 2026 Clean Service. All rights reserved.
          </p>
        </footer>
      )}
    </>
  );
};
export default MainLayout;
