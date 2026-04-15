
import { useState, useEffect } from "react";
import "../styles/admin.css";
import React from "react";
const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = () => {
    fetch("http://localhost:3000/bookings")
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateBookingStatus = (id, newStatus) => {
    fetch(`http://localhost:3000/bookings/${id}/status`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: newStatus,
      }),
    }).then(() => {
      fetchBookings();
    });
  };

  const deleteBooking = (id) => {
    fetch(`http://localhost:3000/bookings/${id}`, {
      method: "DELETE",
    }).then(() => {
      fetchBookings();
    });
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <>
      <h2 id="bookings-section">Bookings</h2>
      <div className="bookings-grid">
        {bookings.map((booking) => (
          <div key={booking.id} className="booking-card">
            <h3>{booking.service.title}</h3>
            <p>Week: {booking.week}</p>
            <p>Period: {booking.period}</p>
            <p className={`status ${booking.status}`}>
              Status: {booking.status}
            </p>

            <div className="booking-actions">
              <button onClick={() => updateBookingStatus(booking.id, "confirmed")}>
                Confirm
              </button>

              <button onClick={() => updateBookingStatus(booking.id, "cancelled")}>
                Cancel
              </button>

              <button onClick={() => updateBookingStatus(booking.id, "completed")}>
                Completed
              </button>

              <button onClick={() => deleteBooking(booking.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminBookings;