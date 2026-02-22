import {NavLink, Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <>
      <nav>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/services">Services</NavLink>
        <NavLink to="/contact">Contact</NavLink>
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/login">Login</NavLink>
      </nav>

      <main>
        <Outlet />
      </main>
    </>
  );
};
export default MainLayout;