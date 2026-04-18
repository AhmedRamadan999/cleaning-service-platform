import React, { useState } from "react";
import "../styles/Contact.css";

const INITIAL_FORM_STATE = { name: "", email: "", subject: "", message: "" };
const INITIAL_STATUS = { loading: false, error: "", success: false };
const API_URL = import.meta.env.VITE_API_URL;

const Contact = () => {
  const [form, setForm] = useState(INITIAL_FORM_STATE);
  const [status, setStatus] = useState(INITIAL_STATUS);

  const handleChange = (e) => {
    if (status.error || status.success) {
      setStatus(INITIAL_STATUS);
    }

    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.subject || !form.message) {
      setStatus({
        ...INITIAL_STATUS,
        error: "Bitte füllen Sie alle Felder aus.",
      });
      return;
    }

    try {
      setStatus({ ...INITIAL_STATUS, loading: true });

      const res = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Etwas ist schiefgelaufen.");

      setStatus({ ...INITIAL_STATUS, success: true });
      setForm(INITIAL_FORM_STATE);
    } catch (err) {
      setStatus({ ...INITIAL_STATUS, error: err.message });
    }
  };

  return (
    <div className="contact-page">
      <h1>Kontakt</h1>

      <div className="contact-container">
        <div className="contact-form-section">
          <h2>Schreiben Sie uns</h2>

          <form onSubmit={handleSubmit} className="contact-form">
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Ihr Name"
            />

            <label htmlFor="email">E-Mail</label>
            <input
              id="email"
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="ihre@email.de"
            />

            <label htmlFor="subject">Betreff</label>
            <select
              id="subject"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              className={form.subject ? "selected" : ""}
            >
              <option value="" disabled>
                Bitte wählen...
              </option>
              <option value="allgemein">Allgemeine Anfrage</option>
              <option value="angebot">Angebot anfordern</option>
              <option value="beschwerde">Beschwerde</option>
              <option value="sonstiges">Sonstiges</option>
            </select>

            <label htmlFor="message">Nachricht</label>
            <textarea
              id="message"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Ihre Nachricht..."
              rows={5}
            />

            {status.error && <p className="error-msg">{status.error}</p>}
            {status.success && (
              <p className="success-msg">
                ✅ Vielen Dank! Ihre Nachricht wurde gesendet.
              </p>
            )}

            <button type="submit" disabled={status.loading}>
              {status.loading ? "Wird gesendet..." : "Nachricht senden"}
            </button>
          </form>
        </div>

        <div className="contact-info-section">
          <div className="contact-info">
            <h2>Unsere Kontaktdaten</h2>

            <div className="info-item">
              <span>📍</span>
              <span>Kettwiger Str. 10, 45127 Essen</span>
            </div>
            <br />

            <div className="info-item">
              <span>📞</span>
              <span>+49 91742239</span>
            </div>
            <br />

            <div className="info-item">
              <span>✉️</span>
              <span>info@cleanservice-essen.de</span>
            </div>
            <br />

            <div className="info-item">
              <span>🕐</span>
              <span>Mo–Fr: 08:00 – 15:00 Uhr</span>
            </div>
          </div>

          <div className="contact-map">
            <iframe
              title="Standort Essen"
              src="https://maps.google.com/maps?q=Kettwiger%20Str.%2010,%20Essen&t=&z=13&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
