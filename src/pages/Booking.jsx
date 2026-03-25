import React from "react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../styles/booking.css"
const Booking = () => {
  const [week, setWeek] = useState("");
  const [period, setPeriod] = useState("");
  const [success, setSuccess] = useState(false);
  const isValid = week !== "" && period !== "";
  const [error, setError] = useState("");

  const location = useLocation();
  const selectedService = location.state?.service;
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
    };
    const response = await fetch("http://localhost:3000/bookings", {
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
    <>
      <h1>Termin buchen</h1>
      {selectedService && <h3>Sie haben {selectedService} gewählt</h3>}
      <div className="booking-wrapper">
        <form onSubmit={handleSubmit} className="booking-form">
          <input
            type="week"
            value={week}
            onChange={(e) => setWeek(e.target.value)}
          />

          <select value={period} onChange={(e) => setPeriod(e.target.value)}>
            <option value="">Bitte auswählen…</option>
            <option value="Vormittag">Vormittag</option>
            <option value="Nachmittag">Nachmittag</option>
          </select>

          <button type="submit" disabled={!isValid}>
            Absenden
          </button>
        </form>
      </div>
      {week && period && (
        <p>
          Sie haben {week} - {period} gewählt.
        </p>
      )}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {success && (
        <p>
          ✅ Vielen Dank! Ihre Terminanfrage wurde gesendet. Wir kontaktieren
          Sie in Kürze.
        </p>
      )}
    </>
  );
};

export default Booking;
