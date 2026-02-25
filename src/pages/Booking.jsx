import React from "react";
import { useState } from "react";


const Booking = () => {
    const [week, setWeek] = useState ("");
    const [period, setPeriod] = useState ("");
    const [success, setSuccess] = useState (false);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (week === "" || period === "") {
            alert("Please4 choose week and perdiod");
        return;
    }
    setSuccess(true);
    };


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
          <button type="submit">Send</button>
        </form>
        {week && <p>{week}</p>}
        {success && (
          <p>
            Der Termin wurde Ihnen mitgeteilt, und Sie werden in Kürze
            kontaktiert ✅.
          </p>
        )}
      </>
    );};


export default Booking;