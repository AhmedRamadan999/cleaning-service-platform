import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/booking.css";


const API_URL = import.meta.env.VITE_API_URL;
const Booking = () => {
  const [week, setWeek] = useState("");
  const [period, setPeriod] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const isValid = week !== "" && period !== "";

  const location = useLocation();
  const selectedServiceId = location.state?.serviceId;
  const selectedServiceTitle = location.state?.serviceTitle;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (week === "" || period === "") {
      setError("Bitte wählen Sie eine Woche und einen Zeitraum aus.");
      return;
    }

    setError("");
    setSuccess(false);

    const bookingData = {
      week,
      period,
      serviceId: selectedServiceId,
    };

    const response = await fetch(`${API_URL}/bookings`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    });

    if (response.ok) {
      setSuccess(true);
      setWeek("");
      setPeriod("");
    } else {
      setError("Fehler beim Senden der Anfrage");
    }
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(false);
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [success]);

  return (
    <div className="booking-page">
      <div className="booking-container">
        <h1>Termin buchen</h1>

        {selectedServiceTitle && (
          <p className="selected-service">
            Gewählter Service: <strong>{selectedServiceTitle}</strong>
          </p>
        )}

        <form onSubmit={handleSubmit} className="booking-form">
          <div className="form-group">
            <label>Woche</label>
            <input
              type="week"
              value={week}
              onChange={(e) => setWeek(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Zeitraum</label>
            <select value={period} onChange={(e) => setPeriod(e.target.value)}>
              <option value="">Bitte auswählen…</option>
              <option value="Vormittag">Vormittag</option>
              <option value="Nachmittag">Nachmittag</option>
            </select>
          </div>

          <button type="submit" disabled={!isValid}>
            Absenden
          </button>
        </form>

        {week && period && (
          <p className="booking-preview">
            Sie haben <strong>{week}</strong> - <strong>{period}</strong>{" "}
            gewählt.
          </p>
        )}

        {error && <p className="booking-error">{error}</p>}

        {success && (
          <p className="booking-success">
            ✅ Vielen Dank! Ihre Terminanfrage wurde gesendet. Wir kontaktieren
            Sie in Kürze.
          </p>
        )}
      </div>
    </div>
  );
};

export default Booking;
