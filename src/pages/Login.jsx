import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import { useAuth } from "../context/AuthContext";
const API_URL = import.meta.env.VITE_API_URL;
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const {login} = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Bitte füllen Sie alle Felder aus.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Anmeldung fehlgeschlagen.");
      login(data.token, data.user.role)
      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
      alert("Erfolgreich angemeldet!");
      setEmail("");
      setPassword("");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="login-page">
      <h1>Anmeldung</h1>
      <div className="login-container">
        <div className="login-form-section">
          <h2>Melden Sie sich an</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <label>E-Mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Passwort</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit">Anmelden</button>

            <p className="signup-link">
              Noch kein Konto? <Link to="/register">Registrieren</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
