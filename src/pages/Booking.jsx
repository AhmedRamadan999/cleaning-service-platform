import React, { useState } from "react";
import { useLocation, NavLink } from "react-router-dom";
import "../styles/booking.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const Booking = () => {
  const [week, setWeek] = useState("");
  const [period, setPeriod] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const location = useLocation();
  const selectedServiceId = location.state?.serviceId;
  const selectedServiceTitle = location.state?.serviceTitle;

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const isLoggedIn = !!token;
  const isValid =
    week !== "" &&
    period !== "" &&
    isLoggedIn &&
    !!userId &&
    !!selectedServiceId;

  const validateBooking = () => {
    if (!token) return "Bitte zuerst einloggen.";
    if (!userId) return "Kein Benutzer gefunden. Bitte erneut einloggen.";
    if (!selectedServiceId) return "Kein Service ausgewählt.";
    if (!week || !period)
      return "Bitte wählen Sie eine Woche und einen Zeitraum aus.";

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateBooking();

    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setSuccess(false);

    const bookingData = {
      week,
      period,
      serviceId: selectedServiceId,
      userId: Number(userId),
    };

    try {
      const response = await fetch(`${API_URL}/bookings`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(bookingData),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        setError(
          data?.error || data?.message || "Fehler beim Senden der Anfrage",
        );
        return;
      }

      setSuccess(true);
      setWeek("");
      setPeriod("");
    } catch (err) {
      console.log(err);
      setError("Serverfehler. Bitte versuchen Sie es erneut.");
    }
  };

  return (
    <div className="booking-page">
      <div className="booking-container">
        <h1>Termin buchen</h1>

        {selectedServiceTitle && (
          <p className="selected-service">
            Gewählter Service: <strong>{selectedServiceTitle}</strong>
          </p>
        )}

        {!success ? (
          <>
            {!isLoggedIn && (
              <p className="booking-error">
                Bitte loggen Sie sich zuerst ein, um einen Termin zu buchen.
              </p>
            )}

            {!selectedServiceId && (
              <p className="booking-error">
                Kein Service ausgewählt. Bitte wählen Sie zuerst einen Service
                aus.
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
                <select
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                >
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
          </>
        ) : (
          <div className="booking-success">
            <p>
              ✅ Vielen Dank! Ihre Terminanfrage wurde gesendet. Wir
              kontaktieren Sie in Kürze.
            </p>

            <NavLink to="/" className="book-btn">
              Zur Startseite
            </NavLink>
          </div>
        )}
      </div>
    </div>
  );
};

export default Booking;
