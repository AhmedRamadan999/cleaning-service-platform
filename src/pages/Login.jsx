// استيراد React و useState لإدارة حالة النموذج
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

const Login = () => {
  // حالة كل حقل في النموذج
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  // دالة تسجيل الدخول
  const handleSubmit = async (e) => {
    e.preventDefault(); // منع إعادة تحميل الصفحة

    // التحقق من الحقول
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
      navigate("/admin");
      alert("Erfolgreich angemeldet!");
      // إفراغ النموذج بعد النجاح
      setEmail("");
      setPassword("");
    } catch (err) {
      alert(err.message); // عرض الخطأ
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
            {/* حقل البريد — value يربطه بالحالة، onChange يحدّث الحالة عند الكتابة */}
            <label>E-Mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {/* حقل كلمة المرور */}
            <label>Passwort</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* زر تسجيل الدخول */}
            <button type="submit">Anmelden</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
