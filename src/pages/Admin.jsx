import { Navigate } from "react-router-dom";

const Admin = () => {
  const token = localStorage.getItem("token");
  return (
    <>
      <h1>Admin</h1>
      <p>We are just testing</p>
    </>
  );
};

export default Admin;
