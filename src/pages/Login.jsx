import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // دالة تسجيل الدخول

  //  تسجيل الدخول

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Bitte füllen Sie alle Felder aus.");
      return;
    }

    try {
      // إرسال البيانات إلى السيرفر
      const res = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Anmeldung fehlgeschlagen.");
      localStorage.setItem("token", data.token);
      navigate("/admin/bookings");
      alert("Erfolgreich angemeldet!");
      // إفراغ النموذج
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
        {/* نموذج تسجيل الدخول */}
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
