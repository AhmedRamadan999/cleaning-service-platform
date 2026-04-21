import React, { useState, useEffect } from "react";
import "../styles/admin.css";

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const fetchContacts = () => {
    fetch(`${API_URL}/contact`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setContacts(data);
        } else {
          setContacts([]);
        }
      })
      .catch((err) => console.log(err));
  };

  const deleteContact = (id) => {
    fetch(`${API_URL}/contact/${id}`, {
      method: "DELETE",
    }).then(() => fetchContacts());
  };

  const updateStatus = (id, newStatus) => {
    fetch(`${API_URL}/contact/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    }).then(() => fetchContacts());
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <>
      <h2>Contact Messages</h2>
      <div className="bookings-grid">
        {contacts.map((contact) => (
          <div key={contact.id} className="booking-card">
            <h3>{contact.name}</h3>
            <p>Email: {contact.email}</p>
            <p>Subject: {contact.subject}</p>
            <p>Message: {contact.message}</p>
            <p>
              Status:{" "}
              <span
                className={
                  contact.status === "replied"
                    ? "status-done"
                    : "status-pending"
                }
              >
                {contact.status === "replied" ? "Replied" : "Pending"}
              </span>
            </p>
            <div className="card-buttons">
              {contact.status !== "replied" && (
                <button
                  className="btn-accept"
                  onClick={() => updateStatus(contact.id, "replied")}
                >
                  Mark as Replied
                </button>
              )}
              <button
                className="btn-delete"
                onClick={() => deleteContact(contact.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default AdminContacts;
