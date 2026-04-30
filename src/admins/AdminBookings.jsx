import React, { useEffect, useState } from "react";
import "../styles/admin.css";
import BookingCard from "./BookingCard";
import { API_URL } from "../config/api";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    try {
      const res = await fetch(`${API_URL}/bookings`);
      const data = await res.json();

      setBookings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log(err);
      setBookings([]);
    }
  };

  const updateBookingStatus = async (id, newStatus) => {
    try {
      await fetch(`${API_URL}/bookings/${id}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
        }),
      });

      fetchBookings();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteBooking = async (id) => {
    try {
      await fetch(`${API_URL}/bookings/${id}`, {
        method: "DELETE",
      });

      fetchBookings();
    } catch (err) {
      console.log(err);
    }
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
