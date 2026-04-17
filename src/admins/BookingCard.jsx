import React from "react";

const BookingCard = ({ booking, updateBookingStatus, deleteBooking }) => {
  return (
    <div className="booking-card">
      <h3>{booking.service?.title || "No Service found"}</h3>
      <p>Week: {booking.week}</p>
      <p>Period: {booking.period}</p>
      <p className={`status ${booking.status}`}>Status: {booking.status}</p>

      <div className="booking-actions">
        <select
          value={booking.status}
          onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
        >
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="cancelled">Cancelled</option>
          <option value="completed">Completed</option>
        </select>

        <button onClick={() => deleteBooking(booking.id)}>Delete</button>
      </div>
    </div>
  );
};

export default BookingCard;
