import React from "react";
import { useState } from "react";
import { useEffect } from "react";
const Booking = () => {
  const [week, setWeek] = useState("");
  const [period, setPeriod] = useState("");
  const [success, setSuccess] = useState(false);
  const isValid = week !== "" && period !== "";
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (week === "" || period === "") {
      setError("Please choose week and period");
      return;
    }
    setError("");
    setSuccess(true);
    setWeek("");
    setPeriod("");
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
      <h1>Booking</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="week"
          value={week}
          onChange={(e) => setWeek(e.target.value)}
        />

        <select value={period} onChange={(e) => setPeriod(e.target.value)}>
          <option value=""> Choose...</option>
          <option value="Vormittag"> Vormittag...</option>
          <option value="Nachmittag"> Nachmittag...</option>
        </select>
        <button type="submit" disabled={!isValid}>
          Send
        </button>
      </form>
      {week && period && (
        <p>
          {" "}
          Sie haben {week} - {period} gewählt.
        </p>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && (
        <p>
          Der Termin wurde Ihnen mitgeteilt, und Sie werden in Kürze kontaktiert
          ✅.
        </p>
      )}
    </>
  );
};

export default Booking;
