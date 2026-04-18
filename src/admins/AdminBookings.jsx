import { useState, useEffect } from "react";
import "../styles/admin.css";
import React from "react";
import BookingCard from "./BookingCard";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;

  const fetchBookings = () => {
    fetch(`${API_URL}/bookings`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateBookingStatus = (id, newStatus) => {
    fetch(`${API_URL}/bookings/${id}/status`, {
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
    fetch(`${API_URL}/bookings/${id}`, {
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
          <BookingCard
            key={booking.id}
            booking={booking}
            updateBookingStatus={updateBookingStatus}
            deleteBooking={deleteBooking}
          />
        ))}
      </div>
    </>
  );
};

export default AdminBookings;
